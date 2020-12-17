import { SessionRepository,UserRepository } from "~/src/repositories";
import redis from "~/util/redis";
import { CustomError } from "~/util/customError";
import jwt from "jsonwebtoken";
import moment from "moment";
import * as constants from "~/util/constant";

export class SessionService { 

static ssoLogin = async (accessToken) => {
    let tokenData = await verifySsoToken(accessToken);
    let finalResponse = {},
    tokenObject = {};
     if (tokenData) {
      let data = await SessionRepository.geSSOLoginInfo(tokenData.userId);
      if(!data){
        throw new CustomError(401, {error:"The sso user id is incorrect, or the account is locked"}, "Unauthorized access");
      }
      let isFirstLogin = data.successfullLoginAt ? false : true;  
      //Fetch role and access right based on user id
      let userRoles = await UserRepository.getAccessRightsByUserId(
        tokenData.userId
      );
      let accessPermissions = [];
      for (let userRole of userRoles) {
        userRole.permissions = `${userRole.accessGroup}_${userRole.accessName}_${userRole.description}`;
        userRole.permissions = (userRole.permissions).replace(/[^A-Z0-9]+/ig, "_")
        accessPermissions.push(userRole.permissions)
      }

      let accessIdList = [];
      if (userRoles) {
        accessIdList = userRoles.map((item) => {
          return item.accessRightMappingId;
        });
      }

      let roles = [];
      let profileId;
      for (let userRole of data.UserRoles) {
        roles.push(userRole.roleId);
        profileId = userRole.portalProfileId;
      }
      if (data.dataValues) {
        delete data.dataValues.dfaEmail
        delete data.dataValues.dfaPhone
        delete data.dataValues.dfaPhoneExt
        delete data.dataValues.dfaPhoneCountryCode
        delete data.dataValues.dfaType
        delete data.dataValues.dfaMobile
        delete data.dataValues.dfaMobileCountryCode
        delete data.dataValues.isDfaApplied
        delete data.dataValues.UserRoles;
        delete data.dataValues.password;
        delete data.dataValues.pwdExpiredAt;
        delete data.dataValues.passwordRetryCount;
        delete data.dataValues.successfullLoginAt;
        data.dataValues.userName = "SSO_"+data.dataValues.SSOUserId;
        data.dataValues.roleId = roles;
        data.dataValues.portalProfileId = profileId;
      }

      //Creat jwt token
      let tokenDetails = {
        userInfo: data,
        accessIdList,
      };

      tokenObject = await generateToken(tokenDetails, constants.SESSION_TIME);
      let loginUserObject = {
          tokenDetailsId:tokenData.tokenDetailsId,
          isTokenUsed: constants.ONE,
          tokenUsedAt: moment.utc().format("YYYY-MM-DD HH:mm:ss")
      };
      await SessionRepository.updateSsoTokenDetails(loginUserObject);

      finalResponse = {
        accessToken: tokenObject.accessToken,
        refreshToken: tokenObject.refreshToken,
        isFirstLogin,
        userData: data,
        userAccessIdList:accessIdList,
        userRoles: accessPermissions,
      };
      return finalResponse;
    }  else {
      throw new CustomError(401, {}, "Unauthorized access");
    }
  };
} // end of UserService Class

/**********************************************************
 * @author Anuj Jain anuj.jain@incedoinc.com
 * @desc verify ssoToken with access token
 * @queryparams ssoToken
 * @return user details
 */
async function verifySsoToken(accessToken) {
  return await jwt.verify(
    accessToken,
    process.env.JWT_SSO_ENCRYPTION_KEY,
    async (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          throw new CustomError(401, {}, "Expired access token");
        }
        throw new CustomError(401, {}, "Unauthorized access");
      }
      let data = await SessionRepository.getSsoTokenDetails(decoded.ssorequestId, decoded.userId,accessToken)
      return data;
    }
  );
}

async function generateToken(tokenDetails, expiryTime) {
  let accessToken = jwt.sign(tokenDetails, process.env.JWT_ENCRYPTION_KEY, {
    expiresIn: expiryTime,
  });

  let refreshToken = jwt.sign(tokenDetails, process.env.JWT_ENCRYPTION_KEY);

  let tokenObject = { accessToken, refreshToken };
  try {
    let session = await redis.saveToken(
      tokenDetails.userInfo.userName,
      JSON.stringify(tokenObject)
    );
    if (session) {
      return tokenObject;
    } else {
      throw new CustomError(500, {}, "Error while generating token");
    }
  } catch (error) {
    throw new CustomError(500, {}, "Error while generating token");
  }
}
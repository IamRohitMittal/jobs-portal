import { JobRepository } from "~/src/repositories";
import db from "~/src/models";
import redis from "~/util/redis";
import { CustomError } from "~/util/customError";
import config from "~/config/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";;
import * as constants from "~/util/constant";
import * as util from '~/util/util';

export class JobService {

  //#region : Job Service
  static createJob = async ({company,role,pkg,skillset}) => {
    const jobStatus=await JobRepository.createJob({company,role,pkg,skillset});
    return jobStatus;
  };

  static getJobs = async ({jobId}) => {
    const jobStatus=await JobRepository.getJobs({jobId});
    return jobStatus;
  };

  static deleteJob = async ({jobId}) => {
    const jobStatus=await JobRepository.deleteJob({jobId});
    return jobStatus;
  };

  static updateJob = async ({jobId,company,role,pkg,skillset}) => {
    const jobStatus=await JobRepository.updateJob({jobId,company,role,pkg,skillset});
    return jobStatus;
  };

  static login = async (email, password, roleId) => {
    let data = await JobRepository.getLoginInfo(email, roleId);
    let finalResponse = {};
    //Creat jwt token
    if (data) {
      const isMatch = await bcrypt.compare(password, data.password);
      if (isMatch) {
        let tokenDetails = {
          userInfo: data.dataValues
        };
        const tokenObject = await generateToken(tokenDetails, constants.SESSION_TIME);
        finalResponse.response="Logged In Successfully";
        finalResponse.user=data;
        finalResponse.token=tokenObject;      
        delete finalResponse.user.password;
      } 
    } else {
      throw new CustomError(403, {}, "The username and/or password entered is incorrect");
    }
    return finalResponse;
  };

  static createUserInfo = async ({name,email,password,roleId}) => {
    // if (email && email !== "" && email !== null) {
    //   let data = await JobRepository.getLoginUserInfo(email);
    //   if (data) {
    //     throw new CustomError(409, {}, "User name already taken.");
    //   }
    // }
    if (password && password !== null) {
      password = await util.gethashedValue(password);
    }
    const userStatus=await JobRepository.createUserInfo({name,email,password,roleId});
    return userStatus;
  };

  static applyForJob = async ({jobId, userId}) => {
    const jobStatus=await JobRepository.applyForJob({jobId, userId});
    return jobStatus;
  };

  static getApplications = async () => {
    const jobStatus=await JobRepository.getApplications();
    return jobStatus;
  };
  //#endregion

} // end of JobService Class

//#region : Miscelleneous
async function generateToken(tokenDetails, expiryTime) {
  let accessToken = jwt.sign(tokenDetails, process.env.JWT_ENCRYPTION_KEY, {
    expiresIn: expiryTime,
  });

  
  let refreshToken = jwt.sign(tokenDetails, process.env.JWT_ENCRYPTION_KEY);
  console.log(tokenDetails, expiryTime,accessToken);
  let tokenObject = { accessToken, refreshToken, refreshToken };
  // try {
  //   let session = await redis.saveToken(
  //     tokenDetails.userInfo.email,
  //     JSON.stringify(tokenObject)
  //   );
  //   if (session) {
  //     return tokenObject;
  //   } else {
  //     throw new CustomError(500, {}, "Error while generating token");
  //   }
  // } catch (error) {
  //   throw new CustomError(500, {}, "Error while generating token");
  // }
}

//#endregion


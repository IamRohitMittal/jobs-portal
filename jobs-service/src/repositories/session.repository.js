import model from "~/src/models";
import db from "~/src/models";
import { Op } from "sequelize";
import * as constants from "~/util/constant";
import moment from "moment";

export class SessionRepository {
  static getSsoTokenDetails(ssorequestId, userId,token) {
    return model.SsoTokenDetail.findOne({
      where: {
        ssorequestId,
        userId,
        token,
        isTokenUsed :{
          [Op.eq]: null
        }
      },
      plain: true,
    });
  }

  static updateSsoTokenDetails(tokenDetails) {
    return model.SsoTokenDetail.update(tokenDetails, {
      where: {
        tokenDetailsId: tokenDetails.tokenDetailsId
      },
      returning: true, // needed for affectedRows to be populated
      plain: true, // makes sure that the returned instances are just plain objects
    });
  }

  static geSSOLoginInfo(userId) {
    return model.Users.findOne({
      where: {
        userId
      },
      attributes: ['userId', 'title', 'firstName', 'lastName', 'userName', 'email', 'phone', 'phoneExt', 'fax', 'isLocked', 'isSSO', 'SSOUserId',
        'isFirstUser', 'displayName', 'successfullLoginAt', 'portalTypeId', 'password', 'phoneCountryCode', 'pwdExpiredAt', 'passwordRetryCount', 'isLocked',
        'isDfaApplied', 'dfaEmail', 'dfaPhone', 'dfaPhoneExt', 'dfaPhoneCountryCode', 'dfaType', 'dfaMobile', 'dfaMobileCountryCode', 'isActivePayee'],
      include: [
        {
          model: model.UserRoles,
          attributes: ["roleId", "portalProfileId"],
        },
      ],
      plain: true,
    });
  }
}

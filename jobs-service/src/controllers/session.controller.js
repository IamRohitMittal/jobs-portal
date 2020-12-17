import { SessionService } from '~/src/services';
import { CustomError } from '~/util/customError';
import { getSqlErrorMessage } from '~/util/sqlHelper';
import * as responseHandler from '~/util/responseHandler';

export class SessionCtrl {
    static ssoLogin = async (req, res, next) => {
        try {
            let { authorization } = req.headers;
            authorization = authorization.split(" ")
            if (authorization && authorization.length > 1) {
                authorization = authorization[1]
            } else {
                throw new CustomError(400, {}, "Missing access token");
            }
            const data = await SessionService.ssoLogin(authorization);
            return responseHandler.success(res, data, "Login successfully", 200);
        } catch (error) {
            if (error.statusCode) {
                return next(error);
            }
            next(new CustomError(500, {}, res.__("Internal Server Error")));
            throw (error);
        }
    }
}
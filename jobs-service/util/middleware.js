import * as responseHandler from '~/util/responseHandler';
import jwt from 'jsonwebtoken';
import { CustomError } from '~/util/customError';
import redis from "~/util/redis";


export const validate = (inputRule) => {
    return (req, res, next) => {
        if (inputRule.body) {
            var { error, value } = inputRule.body.validate(req.body);
        }
        if (!error && inputRule.query) {
            var { error, value } = inputRule.query.validate(req.query);
        }
        if (!error && inputRule.params) {
            var { error, value } = inputRule.params.validate(req.params);
        }
        if (!error && inputRule.headers) {
            var { error, value } = inputRule.headers.validate(req.headers);
        }

        if (error) {
            return responseHandler.error(res, error, error.message, 400);
        } else {
            next()
        }
    }
}

export const authorize = () => {
    return async (req, res, next) => {
        let accessToken = req.get('Authorization') && req.get('Authorization').split(' ')[1];
        if (!accessToken) {
            return responseHandler.error(res, {}, "Auth token missing", 400);
        }
        return await jwt.verify(accessToken, process.env.JWT_ENCRYPTION_KEY, async (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return responseHandler.error(res, err, "Token Expired", 401);
                }
                return responseHandler.error(res, {}, "Invalid access token", 401);
            }

            return await redis
                .getToken(decoded.userInfo && decoded.userInfo.userName)
                .then((redisTokenObject) => {
                    redisTokenObject=JSON.parse(redisTokenObject);
                    let redisAccessToken = redisTokenObject && redisTokenObject.accessToken;
                    if (redisAccessToken === accessToken) {
                        req.loggedInUser = decoded.userInfo;
                        return next();
                    }
                    return responseHandler.error(res, {}, "Invalid access token", 401);
                })
                .catch((err) => {
                    return responseHandler.error(res, {}, "Invalid access token", 401);
                });

        });
    }
}
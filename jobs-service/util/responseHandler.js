import { CustomError } from '~/util/customError';
import { getSqlErrorMessage } from '~/util/sqlHelper';

function resposeHandler(res, responseObject, message, error, status) {
	res.status(status).send({
		"error": error,
		"message": message,
		"data": responseObject
	});
	res.end();
};

export const error = (res, responseObject, message, status) => resposeHandler(res, responseObject, message, true, status);
export const success = (res, responseObject, message, status) => resposeHandler(res, responseObject, message, false, status)
export const sqlError = (error, next) => {
	console.log(error)
	let { errorMessage, httpErrorCode } = getSqlErrorMessage(error.parent.errno, error.parent.sqlMessage);
	if (errorMessage === 'ERROR NOT DEFINED') {
		next(new CustomError(500, {}, "Internal Server Error"));
		throw (error);
	}
	return next(new CustomError(httpErrorCode, {}, errorMessage));
}

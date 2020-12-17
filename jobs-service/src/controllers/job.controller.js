import { JobService } from '~/src/services';
import { CustomError } from '~/util/customError';
import * as responseHandler from '~/util/responseHandler';
import { sendRequest } from "~/util/util";

export class JobCtrl {
    //#region : Job-Service
    static createJob = async (req,res,next)=>{
        try {
            const job=req.body;
            const data = await JobService.createJob(job);
            return responseHandler.success(res, data, "Job created successfully", 200);
        } catch (error) {
            if (error.sql) {
                return responseHandler.sqlError(error, next);
            } else if (error.statusCode) {
                return next(error);
            }
            next(new CustomError(500, {}, res.__("Internal Server Error")));
            throw (error);
        }
    }

    static getJobs = async (req,res,next)=>{
        try {
            const {jobId}=req.query || null;
            const data = await JobService.getJobs({jobId});
            return responseHandler.success(res, data, "Job retrived successfully", 200);
        } catch (error) {
            if (error.sql) {
                return responseHandler.sqlError(error, next);
            } else if (error.statusCode) {
                return next(error);
            }
            next(new CustomError(500, {}, res.__("Internal Server Error")));
            throw (error);
        }
    }

    static deleteJob = async (req,res,next)=>{
        try {
            const {jobId}=req.params;
            const data = await JobService.deleteJob({jobId});
            return responseHandler.success(res, data, "Job deleted successfully", 200);
        } catch (error) {
            if (error.sql) {
                return responseHandler.sqlError(error, next);
            } else if (error.statusCode) {
                return next(error);
            }
            next(new CustomError(500, {}, res.__("Internal Server Error")));
            throw (error);
        }
    }

    static updateJob = async (req,res,next)=>{
        try {
            const {jobId}=req.params;
            const {company,role,pkg,skillset}=req.body;
            const data = await JobService.updateJob({jobId,company,role,pkg,skillset});
            return responseHandler.success(res, data, "Job updated successfully", 200);
        } catch (error) {
            if (error.sql) {
                return responseHandler.sqlError(error, next);
            } else if (error.statusCode) {
                return next(error);
            }
            next(new CustomError(500, {}, res.__("Internal Server Error")));
            throw (error);
        }
    }

    static createUserInfo = async (req, res, next) => {
        try {
            let user = req.body;
            const data = await JobService.createUserInfo(user);
            if(user.roleId==1)
                return responseHandler.success(res, data, "Job Seeker created successfully", 200);
            else
                return responseHandler.success(res, data, "Employer created successfully", 200);
        } catch (error) {
            if (error.sql) {
                return responseHandler.sqlError(error, next);
            } else if (error.statusCode) {
                return next(error);
            }
            next(new CustomError(500, {}, res.__("Internal Server Error")));
            throw (error);
        }
    }

    static login = async (req, res, next) => {
        try {
            let { email, password, roleId } = req.body;
            const data = await JobService.login(email, password, roleId);
            return responseHandler.success(res, data, "User login successfully", 200);
        } catch (error) {
            if (error.sql) {
                return responseHandler.sqlError(error, next);
            } else if (error.statusCode) {
                return next(error);
            }
            next(new CustomError(500, {}, res.__("Internal Server Error")));
            throw (error);
        }
    }

    static applyForJob = async (req, res, next) => {
        try {
            let { jobId, userId } = req.body;
            const data = await JobService.applyForJob({jobId, userId});
            return responseHandler.success(res, data, "Applied for Job successfully", 200);
        } catch (error) {
            if (error.sql) {
                return responseHandler.sqlError(error, next);
            } else if (error.statusCode) {
                return next(error);
            }
            next(new CustomError(500, {}, res.__("Internal Server Error")));
            throw (error);
        }
    }

    static getApplications = async (req, res, next) => {
        try {
            const data = await JobService.getApplications();
            return responseHandler.success(res, data, "Applied retrivevd successfully", 200);
        } catch (error) {
            if (error.sql) {
                return responseHandler.sqlError(error, next);
            } else if (error.statusCode) {
                return next(error);
            }
            next(new CustomError(500, {}, res.__("Internal Server Error")));
            throw (error);
        }
    }
    //#endregion
} 
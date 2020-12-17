import Joi from 'joi';
let tokenRegex = new RegExp("^Bearer\s*")
let pwdRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

export const createJob = {
    body: Joi.object({
        company: Joi.string().required(),
        role: Joi.string().required(),
        pkg: Joi.number().required(),
        skillset: Joi.string().required()
    })
}

export const getJobs = {
    query:Joi.object({
        jobId:Joi.number().optional()
    })
}

export const deleteJob = {
    params:Joi.object({
        jobId:Joi.number().required()
    })
}

export const updateJob = {
    params:Joi.object({
        jobId: Joi.number().required()
    }),
    body: Joi.object({
        company: Joi.string().required(),
        role: Joi.string().required(),
        pkg: Joi.number().required(),
        skillset: Joi.string().required()
    })
}


export const createUserInfo = {
    body: Joi.object({
        password: Joi.string().min(8).regex(pwdRegex).required(),
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        roleId: Joi.number().required(),
    })
}

export const login = {
    body: Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
        roleId: Joi.number().integer().required()
    })
}

export const applyForJob ={
    body: Joi.object({
        jobId: Joi.number().required(),
        userId: Joi.number().required()
    })
}

export const getApplications ={
}
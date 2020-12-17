import Router from 'express';
import { validate, authorize } from '~/util/middleware';
import * as validationInputs from '~/src/validation';
import { JobCtrl  } from '~/src/controllers'

const routerV1 = Router();
// Add API Routs below
// ********ROUTE Block START*********
routerV1.post('/jobs',validate(validationInputs.createJob),JobCtrl.createJob);  // Recruiter
routerV1.get('/jobs',validate(validationInputs.getJobs),JobCtrl.getJobs); //Recruiter, Job seeker
routerV1.delete('/jobs/:jobId',validate(validationInputs.deleteJob),JobCtrl.deleteJob); //Recruiter, Admin
routerV1.put('/jobs/:jobId',validate(validationInputs.updateJob),JobCtrl.updateJob); //Recruiter, Admin

routerV1.post('/user', validate(validationInputs.createUserInfo), JobCtrl.createUserInfo); // Teacher+Student
routerV1.post('/login', validate(validationInputs.login), JobCtrl.login); // Teacher+Student

routerV1.post('/apply-for-job',validate(validationInputs.applyForJob),JobCtrl.applyForJob); //Job Seeker
routerV1.get('/applications',validate(validationInputs.getApplications),JobCtrl.getApplications);

export default routerV1;

import model from "~/src/models";
import { Op, where } from "sequelize";
import { includes } from "lodash";

export class JobRepository {

  //#region : Job Repository
  static createJob({company,role,pkg,skillset}){
    return model.Job.create({
      company,role,pkg,skillset
    });
  }

  static getJobs({jobId}){
    let where={};
    if(jobId){
      where.jobId=jobId;
    }
    return model.Job.findAll({
      where:where
    });
  }

  static deleteJob({jobId}){
    let where={};
    if(jobId){
      where.jobId=jobId;
    }
    return model.Job.destroy({
      where:where
    });
  }

  static updateJob({jobId,company,role,pkg,skillset}){
    let where={};
    if(jobId){
      where.jobId=jobId;
    }
    return model.Job.update(
      {
        company,role,pkg,skillset
      },
      {
      where:where
    });
  }

  static createUserInfo({name,email,password,roleId}){
    if(roleId==1){
      return model.Users.create({
        name,email,password,roleId
      })
    }else{      
      return model.Employer.create({
        name,email,password
      })      
    }
  }

  static getLoginInfo(email,roleId){
    if(roleId==1){
      return model.Users.findOne({
        where:{email}
      })
    }else{
      return model.Employer.findOne({
        where:{email}
      })
    }
    
  }

  static applyForJob({jobId, userId}){
    return model.Application.create({
      jobId,userId
    })
  }

  static getApplications(){
    return model.Application.findAll({
      include:[{
        model:model.Job,
        required: true,
        attributes: ["company","role","package","skillset"],
      },{
        model:model.Users,
        required: true,
        attributes: ["name","email"],
      }]
    })
  }
  //#endregion
}



const {  Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.hasMany(models.Application, {
        foreignKey: {
            name: 'jobId',
            allowNull: false,
          }
      })
      Job.belongsTo(models.Employer, {
        foreignKey: {
            name: 'jobId',
            allowNull: false,
          }
      })
    }
  };
  Job.init({
    jobId:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    company:{
      type: DataTypes.STRING,
      allowNull: false
    },
    role:{
      type: DataTypes.STRING,
      allowNull: false
    },
    pkg:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'package'
    },
    skillset:{
      type: DataTypes.STRING,
      allowNull: false
    },
    postedBy:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Job',
    freezeTableName: true,
    tableName: 'jobs',
    timestamps: false
  });
  return Job;
};
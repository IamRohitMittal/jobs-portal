
const {  Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Application.belongsTo(models.Users, { foreignKey : {name: 'userId'}});
      Application.belongsTo(models.Job, { foreignKey : 'jobId'});
    }
  };
  Application.init({
    applicationId:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    jobId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false
    },
    userId:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    appliedDate:{
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    closingDate:{
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    }
  }, {
    sequelize,
    modelName: 'Application',
    freezeTableName: true,
    tableName: 'applications',
    timestamps: false
  });
  return Application;
};
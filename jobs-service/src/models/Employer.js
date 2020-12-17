const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Employer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Employer.hasMany(models.Application, {
                foreignKey: {
                    name: 'userId',
                    allowNull: false,
                  }
              })
        }

    };

    Employer.init({
        employerId: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            allowNull: true,
            type: DataTypes.STRING
        },
        password: {
            allowNull: true,
            type: DataTypes.STRING
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        }
    }, {
        sequelize,
        modelName: 'Employer',
        freezeTableName: true,
        tableName: 'employer',
        timestamps: false
    });
    return Employer;
};
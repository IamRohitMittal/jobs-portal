const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Users.hasMany(models.Application, {
                foreignKey: {
                    name: 'userId',
                    allowNull: false,
                  }
              })
        }

    };

    Users.init({
        userId: {
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
        modelName: 'Users',
        freezeTableName: true,
        tableName: 'users',
        timestamps: false
    });
    return Users;
};
require('dotenv').config({
    path: process.env.DOTENV_CONFIG_PATH || null,
});

const requireProcessEnv = (name) => {
    if (name in process.env) {
        return process.env[name]
    }
    throw new Error('You must set the ' + name + ' environment variable')
}

module.exports = {
    development: {
        username: requireProcessEnv('DB_USER'),
        password: requireProcessEnv('DB_PASSWORD'),
        database: requireProcessEnv('DB_NAME'),
        host: requireProcessEnv('DB_HOST'),
        port: requireProcessEnv('DB_PORT'),
        dialect: requireProcessEnv('DB_DIALECT'),
        dialectOptions: {
            bigNumberStrings: true
        },
        seederStorage: "sequelize"
    },
    test: {
        username: requireProcessEnv('DB_USER'),
        password: requireProcessEnv('DB_PASSWORD'),
        database: requireProcessEnv('DB_NAME'),
        host: requireProcessEnv('DB_HOST'),
        port: requireProcessEnv('DB_PORT'),
        dialect: requireProcessEnv('DB_DIALECT'),
        dialectOptions: {
            bigNumberStrings: true
        },
        seederStorage: "sequelize"
    },
    production: {
        username: requireProcessEnv('DB_USER'),
        password: requireProcessEnv('DB_PASSWORD'),
        database: requireProcessEnv('DB_NAME'),
        host: requireProcessEnv('DB_HOST'),
        port: requireProcessEnv('DB_PORT'),
        dialect: requireProcessEnv('DB_DIALECT'),
        dialectOptions: {
            bigNumberStrings: true
        },
        seederStorage: "sequelize"
    }
};
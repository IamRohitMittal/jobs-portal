import merge from 'lodash/merge';
require('dotenv').config({
    path: process.env.DOTENV_CONFIG_PATH || null
});

const requireProcessEnv = (name) => {
    if (name in process.env) {
        return process.env[name]
    }
    throw new Error('You must set the ' + name + ' environment variable')
}

const config = {
    all: {
        env: requireProcessEnv('NODE_ENV'),
        appEnv: requireProcessEnv('APP_ENV'),
        port: requireProcessEnv('SERVER_PORT'),
        ip: requireProcessEnv('SERVER_IP'),
        db: {
            host: requireProcessEnv('DB_HOST'),
            port: requireProcessEnv('DB_PORT'),
            user: requireProcessEnv('DB_USER'),
            password: requireProcessEnv('DB_PASSWORD'),
            name: requireProcessEnv('DB_NAME'),
            dialect: requireProcessEnv('DB_DIALECT'),
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        }
    },
    dev: {
        env: requireProcessEnv('NODE_ENV'),
        port: requireProcessEnv('SERVER_PORT'),
        ip: requireProcessEnv('SERVER_IP'),
        db: {
            host: requireProcessEnv('DB_HOST'),
            user: requireProcessEnv('DB_USER'),
            password: requireProcessEnv('DB_PASSWORD'),
            name: requireProcessEnv('DB_NAME'),
            dialect: requireProcessEnv('DB_DIALECT'),
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        }
    },
    uat: {},
    citi_cte: {},
    citi_uat: {},
    prod: {
        env: requireProcessEnv('NODE_ENV'),
        port: requireProcessEnv('SERVER_PORT'),
        ip: requireProcessEnv('SERVER_IP'),
        db: {
            host: requireProcessEnv('DB_HOST'),
            user: requireProcessEnv('DB_USER'),
            password: requireProcessEnv('DB_PASSWORD'),
            name: requireProcessEnv('DB_NAME'),
            dialect: requireProcessEnv('DB_DIALECT'),
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        }
    }
}

export default merge(config.all, config[config.all.appEnv]);
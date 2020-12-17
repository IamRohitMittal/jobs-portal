const bcrypt = require('bcrypt');
const saltRounds = 10;
import axios from 'axios';
import { SERVICE_NAME } from '~/util/constant';
import config from '~/config/config';

export const gethashedValue = (plainValue) => {
    let hashedValue = bcrypt.hash(plainValue, saltRounds);
    return hashedValue;
}

export const generateOTP = (digit) => {
    digit = digit || 6;
    // Declare a digits variable  
    // which stores all digits 
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < digit; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

// this function is to send request to other microservices
export const sendRequest = ({ serviceName, method, apiPath, data = null, headers = null, queryString = null }) => {
    let serviceUrl;
    if (serviceName === SERVICE_NAME.USER_SERVICE) {
        serviceUrl = config.userServiceApiUrl;
    } else if (serviceName === SERVICE_NAME.CLIENT_SERVICE) {
        serviceUrl = config.clientServiceApiUrl;
    } else if (serviceName === SERVICE_NAME.CLIENT_CONFIG_SERVICE) {
        serviceUrl = config.clientConfigServiceApiUrl;
    } else if (serviceName === SERVICE_NAME.PAYEE_SERVICE) {
        serviceUrl = config.payeeServiceApiUrl;
    } else if (serviceName === SERVICE_NAME.NOTIFICATION_SERVICE) {
        serviceUrl = config.notificationServiceApiUrl;
    } else if (serviceName === SERVICE_NAME.PAYMENT_SERVICE) {
        serviceUrl = config.paymentServiceApiUrl;
    } else if (serviceName === SERVICE_NAME.IDENTITY_SERVICE) {
        serviceUrl = config.identityServiceApiUrl;
    }
    let url = ` ${serviceUrl}/api/${serviceName}/${apiPath}`;
    if (queryString) {
        url += `?${queryString}`;
    }
    let requestObj = { method, url, data };
    if (headers) {
        requestObj.headers = headers;
    }
    return axios(requestObj);
}
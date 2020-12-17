import bodyParser from 'body-parser'
import express from 'express';
import config from './config/config';
import routerV1 from './routes/v1/routes';
import cors from 'cors';
import i18n from 'i18n';

i18n.configure({
    locales:['en', 'de'],
    directory: __dirname + '/locales'
});

require('./src/models');
const app = express();

// set middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(i18n.init);

// set router middleware
app.use('/api/job-service/v1', routerV1);

// create express server 
const server = app.listen(config.port, config.ip, () => {
    require('figlet')('Node . Js', {
        font: 'Slant'
    },
    function (err, data) {
        if (err) {
            return;
        }
        console.log(data);
    });
})

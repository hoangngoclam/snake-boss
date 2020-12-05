import App from './app';
import * as bodyParser from 'body-parser';
import loggerMiddleware from './middlewares/logger';
import { HomeController, UserController } from '@controllers';
const app = new App({
    port: 5000,
    controllers: [new HomeController(), new UserController()],
    middleWares: [bodyParser.json(), bodyParser.urlencoded({ extended: true }), loggerMiddleware],
});
app.Listen();

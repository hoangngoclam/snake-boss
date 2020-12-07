import App from './app';
import * as bodyParser from 'body-parser';
import loggerMiddleware from './middlewares/logger';
import { HomeController, MatchController, UserController } from '@controllers';
import corsPolicyMiddleware from 'middlewares/corsPolicy';
const app = new App({
    port: 5000,
    controllers: [new HomeController(), new UserController(), new MatchController()],
    middleWares: [bodyParser.json(), bodyParser.urlencoded({ extended: true }), loggerMiddleware, corsPolicyMiddleware],
});
app.Listen();

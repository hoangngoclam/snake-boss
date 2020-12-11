import * as express from 'express';
import { Request, Response } from 'express';
class HomeController implements IControllerBase {
    public path = '/';
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }
    public initRoutes() {
        this.router.get('/', function (req, res) {
            res.render('pages/index');
        });
        this.router.get('/about', function (req, res) {
            res.render('pages/about');
        });
    }
}
export default HomeController;

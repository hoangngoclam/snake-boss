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
    // private index = (req: Request, res: Response) => {
    //     const users = [
    //         {
    //             id: 1,
    //             name: 'Ali',
    //         },
    //         {
    //             id: 2,
    //             name: 'Can',
    //         },
    //         {
    //             id: 3,
    //             name: 'Ahmet',
    //         },
    //     ];
    //     res.json(users);
    // };
}
export default HomeController;

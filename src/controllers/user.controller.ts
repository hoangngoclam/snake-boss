import Database from 'database';
import * as express from 'express';
import { Request, Response } from 'express';
import UserModel from 'models/user.model';
class UserController implements IControllerBase {
    public router = express.Router();
    constructor() {
        this.initRoutes();
    }
    public initRoutes() {
        this.router.get('/user', this.get);
        this.router.post('/user', this.post);
    }
    private async get(req: Request, res: Response) {
        const users: UserModel[] = await Database.Users();
        res.json(users);
    }
    private post = async (req: Request, res: Response) => {
        const newUser: UserModel = new UserModel();
        const displayName: string = req.body.displayName;
        const userName: string = req.body.userName;
        const password: string = req.body.password;
        newUser.displayName = displayName;
        newUser.userName = userName;
        newUser.password = password;
        const resultInsert: UserModel = await Database.AddUsers(newUser);
        res.json(resultInsert);
    };
}
export default UserController;

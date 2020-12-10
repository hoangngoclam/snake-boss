import Database from 'database';
import * as express from 'express';
import { Request, Response } from 'express';
import UserModel from 'models/user.model';
import * as multer from 'multer';
import * as path from 'path';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/imgs/'));
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

class UserController implements IControllerBase {
    public router = express.Router();
    constructor() {
        this.initRoutes();
    }
    public initRoutes() {
        this.router.get('/user-rate', this.getUserRate);
        this.router.get('/user/info', this.get);
        this.router.post('/user/register', this.post);
        this.router.post('/user/login', this.login);
        this.router.post('/user/edit', upload.single('avatar'), this.edit);
        this.router.get('/user/:id', this.getProfile);
    }

    private async getUserRate(req: Request, res: Response) {
        const users: UserModel[] = await Database.GetUserRate();
        res.json({ users: users, success: true });
    }
    private async getProfile(req: Request, res: Response) {
        let id: string = req.params.id;
        const user: UserModel = await Database.FindUserById(parseInt(id));
        res.json({ user: user, success: true });
    }

    private async get(req: Request, res: Response) {
        const users: UserModel[] = await Database.AllUser();
        res.json({ users: users, success: true });
    }

    private post = async (req: Request, res: Response) => {
        const newUser: UserModel = new UserModel();
        const displayName: string = req.body.displayName;
        const email: string = req.body.email;
        const password: string = req.body.password;
        if (!email || !password || !displayName) {
            res.json({ success: false, validate: false });
        }
        newUser.displayName = displayName;
        newUser.email = email;
        newUser.password = password;
        const resultInsert: UserModel = await Database.AddUsers(newUser);
        if (!resultInsert) {
            res.json({ success: false, validate: true });
        }
        res.json({ user: resultInsert, success: true, validate: true });
    };

    private login = async (req: Request, res: Response) => {
        const email: string = req.body.email;
        const password: string = req.body.password;
        console.log(email, password);
        if (!email || !password) {
            return res.json({ success: false, validate: false });
        }
        const user: UserModel = await Database.PostLoginUser(email, password);
        if (!user) {
            return res.json({ success: false, validate: true });
        }
        res.json({ user: user, success: true, validate: true });
    };

    private edit = async (req: Request, res: Response) => {
        console.log(req.file);
        let avatarUrl: string = null;
        if (req.file) {
            avatarUrl = req.file.path.replace(req.file.destination, '');
        }
        const id: number = req.body.id;
        const displayName: string = req.body.displayName;
        let password: string = req.body.password;
        const changePassword: boolean = req.body.changePassword;
        if (id == null || displayName == null || password == null) {
            res.json({ success: false, validate: false });
        }
        if (changePassword == false || changePassword == null) {
            password = null;
        }
        const user: UserModel = await Database.EditUser(avatarUrl, displayName, password, id);

        res.json({ success: true, user: user, validate: true });
    };
}
export default UserController;

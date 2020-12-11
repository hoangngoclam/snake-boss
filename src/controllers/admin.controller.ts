import Database from 'database';
import * as express from 'express';
import { Request, Response } from 'express';
import AdminModel from 'models/admin.model';
import MathModel from 'models/math.model';

class AdminController implements IControllerBase {
    public router = express.Router();
    constructor() {
        this.initRoutes();
    }
    public initRoutes() {
        this.router.post('/admin/login', this.post);
    }
    private async post(req: Request, res: Response) {
        const userName: string = req.body.userName;
        const password: string = req.body.password;
        const admin: AdminModel = await Database.PostLoginAdmin(userName, password);
        if (admin == null) {
            res.json({ success: false });
        }
        res.json({ admin: admin, success: true });
    }
}
export default AdminController;

import Database from 'database';
import * as express from 'express';
import { Request, Response } from 'express';
import MathModel from 'models/math.model';
import UserModel from 'models/user.model';
import * as path from 'path';

class MatchController implements IControllerBase {
    public router = express.Router();
    constructor() {
        this.initRoutes();
    }
    public initRoutes() {
        this.router.post('/match', this.post);
    }
    private async post(req: Request, res: Response) {
        const userId: number = req.body.userId;
        const score: number = req.body.score;
        const match: MathModel = await Database.PostAddMatch(userId, score);
        if (match == null) {
            res.json({ success: false });
        }
        res.json({ match: match, success: true });
    }
}
export default MatchController;

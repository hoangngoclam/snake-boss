import { Request, Response } from 'express';
const corsPolicyMiddleware = (req: Request, resp: Response, next) => {
    resp.header('Access-Control-Allow-Origin', '*');
    resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
};
export default corsPolicyMiddleware;

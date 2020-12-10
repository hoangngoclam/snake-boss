import * as express from 'express';
import { Application } from 'express';
import * as path from 'path';
class App {
    public app: Application;
    public port: number;
    constructor(appInit: { port: number; middleWares: any; controllers: any }) {
        this.app = express();
        this.port = appInit.port;
        this.middlewares(appInit.middleWares);
        this.routes(appInit.controllers);
        this.assets();
        this.viewEngine();
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void }) {
        middleWares.forEach((middleware) => {
            this.app.use(middleware);
        });
    }
    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void }) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }
    private assets() {
        this.app.use(express.static('public'));
    }
    private viewEngine() {
        this.app.set('views', path.join(__dirname, './views'));
        this.app.set('view engine', 'ejs');
    }
    public Listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running in port: ${this.port}`);
        });
    }
}
export default App;

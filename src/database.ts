import * as fs from 'fs';
import * as path from 'path';
import UserModel from 'models/user.model';
class Database {
    static async ReadFile(fileDataName: string): Promise<string> {
        return new Promise((res, rej) => {
            fs.readFile(path.join(__dirname, './data/' + fileDataName), 'utf8', (error, data) => {
                if (error) {
                    rej('Error read file');
                }
                res(data);
            });
        });
    }
    static async WriteFile(fileDataName: string, data: string): Promise<boolean> {
        return new Promise((res, rej) => {
            fs.writeFile(path.join(__dirname, './data/' + fileDataName), data, 'utf8', (error) => {
                if (error) {
                    rej(false);
                }
                res(true);
            });
        });
    }
    static async Users(): Promise<UserModel[]> {
        const dataString: string = await this.ReadFile('database.user.json');
        const result: UserModel[] = JSON.parse(dataString);
        return result;
    }
    static async AddUsers(userInput: UserModel): Promise<UserModel> {
        const dataString: string = await this.ReadFile('database.user.json');
        const users: UserModel[] = JSON.parse(dataString);
        userInput.id = users[users.length - 1].id + 1;
        users.push(userInput);
        const resultWRight: boolean = await this.WriteFile('database.user.json', JSON.stringify(users));
        if (resultWRight === false) {
            return null;
        }
        return userInput;
    }
}

export default Database;

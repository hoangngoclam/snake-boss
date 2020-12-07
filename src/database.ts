import * as fs from 'fs';
import * as path from 'path';
import UserModel from 'models/user.model';
import MathModel from 'models/math.model';
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
    static async FindUserById(id: number): Promise<UserModel> {
        const users: UserModel[] = await this.AllUser();
        const result: UserModel = users.find((x) => x.id === id);
        return result;
    }

    static async PostLoginUser(email: string, password: string): Promise<UserModel> {
        const users: UserModel[] = await this.AllUser();
        const result: UserModel = users.find((x) => x.email === email && x.password === password);
        return result;
    }
    static async AllMatch(): Promise<MathModel[]> {
        const dataString: string = await this.ReadFile('database.match.json');
        const matchs: MathModel[] = JSON.parse(dataString);
        return matchs;
    }
    static async GetUserRate(): Promise<UserModel[]> {
        let users: UserModel[] = await this.AllUser();
        const matchs: MathModel[] = await this.AllMatch();
        users = users.map((userItem) => {
            userItem.score = 0;
            const userMatch = matchs.filter((x) => x.userId == userItem.id);
            if (userMatch.length > 0 && userMatch != null && userMatch != undefined) {
                userMatch.forEach((matchItem) => {
                    if (userItem.score < matchItem.score) {
                        userItem.score = matchItem.score;
                    }
                });
            }
            return userItem;
        });
        users.sort((a, b) => b.score - a.score);
        return users;
    }

    static async PostAddMatch(userId: number, score: number) {
        const users: UserModel[] = await this.AllUser();
        if (userId == null || userId == undefined || users.find((x) => x.id == userId) == null) {
            return null;
        }
        const matchs: MathModel[] = await this.AllMatch();
        const match: MathModel = new MathModel();
        match.userId = userId;
        match.score = score;
        match.time = new Date();
        matchs.push(match);
        const resultWRight: boolean = await this.WriteFile('database.match.json', JSON.stringify(matchs));
        if (resultWRight === false) {
            return null;
        }
        return match;
    }

    static async EditUser(avatarUrl: string, displayName: string, password: string, id: number): Promise<UserModel> {
        let users: UserModel[] = await this.AllUser();
        const userF: UserModel = users.find((x) => x.id == id);
        if (userF == null) {
            return null;
        }
        if (avatarUrl != null) {
            userF.avatarUrl = avatarUrl;
        }
        userF.displayName = displayName;
        if (password != null) {
            userF.password = password;
        }
        users = users.map((item) => {
            if (item.id == userF.id) {
                return userF;
            }
            return item;
        });
        const resultWRight: boolean = await this.WriteFile('database.user.json', JSON.stringify(users));
        if (resultWRight == false) {
            return null;
        }
        return userF;
    }

    static async CheckLoginUser(email: string, password: string): Promise<boolean> {
        const users: UserModel[] = await this.AllUser();
        const allowUser: UserModel = users.find((x) => x.email === email && x.password === password);
        if (allowUser != null) {
            return true;
        }
        return false;
    }

    static async AllUser(): Promise<UserModel[]> {
        const dataString: string = await this.ReadFile('database.user.json');
        const result: UserModel[] = JSON.parse(dataString);
        return result;
    }
    static async AddUsers(userInput: UserModel): Promise<UserModel> {
        const dataString: string = await this.ReadFile('database.user.json');
        const users: UserModel[] = JSON.parse(dataString);
        if (users.find((x) => x.email === userInput.email) != null) {
            return null;
        }
        userInput.id = users[users.length - 1].id + 1;
        userInput.avatarUrl = 'default.jpg';
        users.push(userInput);
        const resultWRight: boolean = await this.WriteFile('database.user.json', JSON.stringify(users));
        if (resultWRight === false) {
            return null;
        }
        return userInput;
    }
}

export default Database;

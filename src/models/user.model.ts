class UserModel {
    public id: number;
    public displayName: string;
    public email: string;
    public password: string;
    public avatarUrl: string;
    public score?: number = 0;
}

export default UserModel;

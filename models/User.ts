
import { userCollection } from "../mongo.ts";

export default class User {
    public id?: string;
    public name: string;
    public email: string;
    public password: string;
    constructor({id = "", name = "", email = "", password = ""}){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }
    static async findOne(params: object) {
        const user = await userCollection.findOne(params);
        console.log(user);
        return user;
    }
    async save() {
        delete this.id;
        const { $oid } = await userCollection.insertOne(this);
        this.id = $oid;
        console.log(this.id);
        return;
    }
}
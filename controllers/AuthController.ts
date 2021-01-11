import { RouterContext, hashSync, compareSync, create } from "../deps.ts";
import User from "../models/User.ts";

const key = Deno.env.get('JWT_SECRET_KEY');

class AuthController {
    async login(ctx: RouterContext){
        const {value} = await ctx.request.body();
        const {email, password} = await value;
        if(!email || !password){
            ctx.response.status = 422;
            ctx.response.body = { message: "Please provide email and password " }
            return;
        }
        let user = await User.findOne({email});
        console.log(user);
        if(!user){
            ctx.response.status = 422;
            ctx.response.body = { message: "The user doesn't existed" }
            return;
        }
        if(!compareSync(password, user.password)){
            ctx.response.status = 422;
            ctx.response.body = { message: "Something went wrong" }
            return;
        }
        const payload = {
            iss: user.email,
            exp: new Date().getTime() + 60 * 60 * 1000,
        }
        const jwt = await create({ alg: "HS512", typ: "JWT" }, payload, key!)
        ctx.response.status = 201;
        ctx.response.body = { name: user.name, email: user.email, jwt}
    }
    async register(ctx: RouterContext){
        const {value} = await ctx.request.body();
        const {name, email, password} = await value;
        let user = await User.findOne({email});
        if(user){
            ctx.response.status = 422;
            ctx.response.body = { message: "Email is already existed" }
            return;
        }
        const hashedPassword = hashSync(password);
        let newUser = new User({name, email, password: hashedPassword});
        await newUser.save();
        ctx.response.status = 201;
        ctx.response.body = { id: newUser.id, name: newUser.name, email: newUser.email }
    }
}

const authController = new AuthController();

export default authController;
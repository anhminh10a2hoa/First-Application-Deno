import { RouterContext } from "https://deno.land/x/oak@v6.4.1/router.ts";
import { verify } from "../deps.ts";
import User from "../models/User.ts";

export const authMiddleware = async(ctx: RouterContext, next: Function) => {
    const headers = ctx.request.headers;
    const authHeader = headers.get('Authorization');
    if(!authHeader){
        ctx.response.status = 401;
        return;
    }
    const jwt = authHeader.split(' ')[1];
    if(!jwt){
        ctx.response.status = 401;
        return;
    }
    const payload = await verify(jwt, Deno.env.get('JWT_SECRET_KEY')!, "HS512");
    if(payload){
        const user = await User.findOne({email: payload?.iss});
        ctx.state.user = user;
        await next();
        console.log(payload);
    } else {
        ctx.response.status = 401;
    }
}
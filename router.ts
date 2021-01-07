import { Router, RouterContext } from "./deps.ts";

const router = new Router();

router
    .get('/', (ctx: RouterContext) => {
        ctx.response.body = "Hello World!";
    })
    .post

export default router;
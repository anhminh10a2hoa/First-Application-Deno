import { Application } from "./deps.ts";
import router from "./router.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods()); 

app.addEventListener("listen", ({hostname, port, secure}) => {
    console.log(`The server is running on  ${hostname || 'localhost:'} ${port}`);
})

await app.listen({port: 8000});
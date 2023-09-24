/*
    In order to avoid writing all the endpoints in your main file,
     you can split the enpoints to multiple files in two ways:
        1- Passing the express object to functions:
            -----in main file
                import express from "express";
                import {applyChatEdnpoints} from "path/to/file"
                const app = express();
                applyChatEndpoints(app);
            -----in the function file:
                export const applyChatEndpoints(app)=>{
                    app.get(...);
                    app.post(...);
                    ...
                }
                NOTE: although this way works but express provides a better way with express.Router();
        2- Using (express.Router) & the (use) function:
            -----in main file
                import express from "express";
                const app = express();
                const userRouter = require("../routes/user");
                app.use("/user", userRouter);
                        -------
                // the underlined parameter is the path prefix (all endpoints in the user file will be prefixed with "/user" automatically)
            -----in user file
                import express from "express";
                const router = express.Router();
                router.get("/",()=>{}); <== (1)
                router.post("/create", ()=>{}); <== (2)
                ...
                NOTE: the endpoints path will be (1) => "localhost:port/user/", (2) => "localhost:port/user/create"
        NOTE: in the second method if you have a lot of route files it's better to apply them with a function in a seperate file:
            -----in main file
                import express from "express";
                import applyRouters from "path/to/file";
                const app = express();
                applyRouters(app);
            -----in applyRouters file:
                export default function applyRouters(app){
                    const userRouter = require("../routes/user");
                    app.use("/user", userRouter);

                    const chatRouter = require("../routes/chat");
                    app.use("/chat", chatRouter);
                    ...
                }
            NOTE: This is simply javascript and not some rules you have to follow for express to work,
             so feel free to seperate anything as a function as you see fit.
*/

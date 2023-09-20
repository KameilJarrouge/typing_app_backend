/*
    What is Express.js
    -it is a back end web application framework for building RESTful APIs with Node.js.
    -What is Node.js? a javascript runtime environment. (like jre for java)
    -What are RESTful APIs:
        While other types of APIs like web API might use a collection of protocols to exchange data,
         RESTful APIs use HTTP to exchange the data.
    -How to use express:
        1- Accessing the express object:
            import express from "express";
            const app = express();
        2- Creating endpoints from the object:
            app.get("endpont", (request, response)=>{
                // the callback(function) to execute when a request is received on this endpoint
                // the request and response arguments are passed automatically by the express for you to use them 
                response.send(<response data>); this and the next one works the same in our case
                response.json(<response data>); 
                response.sendStatus(<number>); if you don't want to send data (you can find online all the numbers and what they mean)
                // these are the ways to send back result to the user.
            })
            NOTE: All the endpoints can be defined in your main file, or can be seperated in multiple files.
             It's up to you, but I recommend seperating enpoints. (will explain how later)
        3- The (use) function:
            app.use(<something>);
            This has alot of uses but in our program we will use it for 3 things:
                1- To tell express that we will be using json in our requests:
                    app.use(express.json())
                2- To configure cors:
                    import cors from "cors";
                    app.use(
                        cors({
                            origin:"*",
                            methods: "*",
                            credentials: true,
                        })
                    );
                3- To add Middlewares (explained later in this file).
        4- The (listen) function:
            app.listen(<port>);
            -The listent function accepts other parameters not important for now (you can research it on your own)

    -What are Middlewares:
        - Understanding Milddlewares will help you better understand interceptors in axios which are middlewares.
        - Middlewares are a piece of code that you wish to execute on a certain event (before each request for example).
        - How to define a Middleware:
            - We covered how to define a callback to the request:
                app.get("endpoint", 'callback');
                app.get("endpoint", (request, respone)=>{//do something})
            - You can consider a middleware to be the same but has an extra parameter(next) which is a function:
                (request, respone, next)=>{
                    // do stuff with the request and respone
                    // call next when you are ready to go to the next callback
                    next();
                }
                // in our case a middleware will be used to make sure that the header in the request object has a valid token!
            - Where to use the middleware:
                1- Can be used per endpoint (meaning it will only be applied on this single endpoint):
                    app.get("endpoint", middleware, callback);
                    app.get("endpoint",
                    (req,res,next)=>{//do stuff in middleware},
                    (req,res)=>{//do stuff in endpoint}
                    );
                    // you can chain middlewares:
                    app.get("endpoing", middleware1, middleware2, ....., callback);
                    the next function in middleware1 calls middleware2 and so on...
                2- Can be applied to all endpoints that comes after it:
                    case 1:
                        app.post("login",()=>{});   // the middleware is not applied on this endpoint
                        app.use((req, res, next)=>{//middleware stuff})
                        app.get("users");   // 
                        app.get("chats");   // the middleware is applied on these endpoints
                        ...                 //
                    case 2:
                        app.post("login",()=>{});                   // no middleware is applied
                        app.use((req, res, next)=>{})               // middleware1
                        app.get("users", ()=>{});                   // middleware1 applied to this endpoint
                        app.use((req, res, next)=>{})               // middleware2
                        app.get("chats", ()=>{});                   // middleware1 and middleware2 applied to these endpoints
                        app.get("messages",
                        (req,res,next)=>{middleware 3},             // all three middlewares are applied
                        ()=>{})

*/

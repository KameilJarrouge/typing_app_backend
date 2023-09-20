/*
    what you need to know!
    HTTP/HTTPs (Hypertext Transfer Protocol/ Hypertext Transfer Protocol secure)
    It is used in web development mainly to communicate between the server and the client
    HTTP structure:
    METHODS:
        GET,POST,PUT,DELETE,UPDATE,.... (other methods are not common)
    URL:
        https://domain:port/path?query1=value1&query2=value2&...
        -----   ------ ---  ---- ----------------------------
          1       2     3     4              5
        
        1- http vs https:
            -The main difference is the security of the data, the https encrypts the body and header of the request 
             (the url is not encrypted that's why you should not send sensitive data in the url) 
        2- The domain or IP:
            -domains like: google.com, facebook.com, localhost, ...
            -IPs like: 127.0.0.1(the localhost IP).
        3- The port number:
            -If not specified ==> the port is 80
        4- The path:
            -In our case and for simplicity lets say that "you" the programmer will define the paths that the http protocol
             can request.
            ex: 
                Simple Path: /login (without params)
                
                Path: /chat/3/new-message
                -This path includes params, which is defined in express.js as follows:
                    /chat/:id/new-message
                          ---
                    -You can name the param whatever you want just make it simple and understandable.
                    -How to access it in you backend code?
                        get("chat/:id/new-message", (request, respone)=>{
                            let chatId = request.params.id;  chatId -> "3" 
                        });
                NOTE: You can have more than one param in the url as long as each one of them has a unique name!
                ex: /chat/:cid/message/:mid/delete-message
                    request.params.cid
                    request.params.mid
                NOTE: you might face some problems regarding the type of the param (which will be returned as a string)
                        you can cast it to a number using Number(request.params.id)
        5- The Query:
            -You can send query fields in all METHODS (but most common in GET).
            -After the path if you wish to add query fields you prefix the first field with (?)
             and the rest of the fields with (&).
            -Where is this useful?
                Let's say that you want to fetch some data about the weather (which you defined as GET method) but you want 
                 the user to be able to sort the information on the temperature. As GET methods doesn't allow you to use the BODY
                 you need to send the sorting (ascending / descending) in the query:
                    https://localhost/weather?sort=asc ==> get me the weather in ascending order based on the temperature
            -How to access the query fields:
                get("weather", (request, response)=>{
                    if(request.query.sort === "asc"){
                        return the weather in ascending order
                    }else{
                        return the weather in descending order
                    }
                })
            NOTE: all the values are returned as a String. Some query fields may require casting to other types!
    Body:
        -The body of the request contains key value pairs.
        -It's used in axios in your frontend like this:
            axios.post("endpoint to create user",
                {   // this object is the body
                    username:<value>,
                    password:<value>
                }
            );
        -It's recieved in the backend like this:
            post("endpoint to create user", (request, response)=>{
                request.body.username;
                request.body.password;
            })
    Headers:
        -The header of the request also contains key value pairs, but has configuration details rather than data.
        -It has some pre-defined keys like Content-Type, Accepts, authorization, ...
        -Useful for passing tokens to the server:
            { // header object
                authorization: "Bearer <token>"
                // this is how you send the token to the server, the word Bearer then space then the token.
            }
        -Content-Type defines what the content of the request is, in most request it will be (Application/json).
         but in other cases where you want to send files for example this will change.
        -NOTE: the header configuration is per request, meaning you have to configure each and every request. There are ways to make this job
         easier with interceptors. Will be discussed later when we are talking about Axios.
*/

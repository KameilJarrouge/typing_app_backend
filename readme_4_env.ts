/*
    What are .env (environment) files?
    
    It's a file used to keep private configurations and user specific configurations (it contains data as key-value pairs).
    
    Before we dive into env files you must understand the difference between production environment and development environment:
        -Production:
            In the production environment your project is now running on some hosting service online or locally on the customer's machine
             and all the configurations(in .env file) must be correct for the production server.
        -Development:
            In the development environment your project needs to run on the machines of your team, meaning each one of them has to have a 
             different (.env) file that contains the right configuration for the project to work, it might be that each one of them has a
             different database connection and a different location of important files and so on...
    
    What kind of configurations might this file hold:
        1-Connection strings to databases:
            -In our case the connection string is the database file path (because we are using sqlite).
            -But in other databases this string might contain database user information (username and password).
        2-Secret token:
            -Helps create access tokens for users.
        For now this is what we will need, but keep in mind that there are a lot more stuff that can be stored in this file.
    
    How to write in the .env file:
        -----your .env file
            DATABASE_URL="<value>"
            SECRET_TOKEN="<value>"
            TEST=<number> <=== you can have number and strings values
        NOTE: It's common to write the keys all in capital letters and seperate words with an underscore.
    
    How to access them in your project:
        -----any file
            require("dotenv").config();
            process.env.<key>
            process.env.DATABASE_URL
        NOTE: You don't need to import process object, it's imported by default.But you need a package called "dotenv"
    
    NOTE: This files must not be pushed to your github repo, because it might contain sensitive information
     but it's a common practice to push a env.template file which has all the keys but without values just so
     other programmers can know what information is needed to run the project.
*/

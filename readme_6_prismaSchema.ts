/*
    What you need to know before using prisma:
        -Basic understanding of relational databases concepts like relations(one-to-one, one-to-many, many-to-many).
        -You can use prisma with non-relational databases.
        -You don't need to fully understand how to write SQL code (although I recommend that you study it on your own).
    1- What is a schema in prisma:
        -It's a file called "schema.prisma" normally which contains the structure of your database and some configurations.
        -For the sake of simplicity we can say that this file will contain 3 sections:
            1-The client (keep it as it is):
                generator client {
                    provider      = "prisma-client-js"
                    binaryTargets = ["native"]
                }
            2-The db:
                datasource db {
                    provider = "sqlite"
                    url      = env("DATABASE_URL")
                }
                -The provider which is the name of the database your using, like(sqlite, mysql, mongodb, ...)
                -The url of the database (better called connection string):
                    -You can use the env() function to get configuration from the .env file
                    -Please note that the database you are connecting to is usually a server which can be served locally
                     or on the Internet, but in our case (sqlite) there is no server it's only a file.
            3-The models (tables in the database):
                model User {
                    id       Int        @id @default(autoincrement()) //primery key
                    username String     @default("admin")
                    password String     @default("admin")
                    TextUser TextUser[]
                }
                Syntax:
                    model <Table name> {
                        <Column name>   <Type>  <Attributes>
                        -------------   ------  ------------
                              1            2         3
                    }
                    1-You can use any name you want but keep it simple and easy to understand.
                        -Try to keep a single convention in naming:
                            -Camel Case: first name ==> firstName
                            -Underscore seperated: first name ==> first_name
                    2-You can find a list of all the types available in prisma, but the most common to use are:
                        -Int
                        -Decimal: floating-point numbers (double)
                        -Float: floating-point numbers (float)
                        -Boolean
                        -String
                        -DateTime: you can store Date Objects from the javascript Date class (new Date() <== current date & time)
                        Note: If you put ? after the type it means that it can be null (optional field)
                        Note: If you put a model name that means that you are creating a relation (1-1, 1-m, m-m)
                        Note: You you can use [] after the model name to indicate the many part of the relation.
                    3-Common Attributes (a field can have multiple attributes):
                        -@id ==> indicates that this field is the primary key
                        -@default(<default value>) ==> assings a default value to the field when no value is given:
                            -@default(uuid()) ==> uuid() returns a unique string (usefull for ids)
                            -@default(autoincrement()) ==> autoincrement() returns an incremented value (0,1,2,3,4,5,...)
                             also useful for ids.
                            -@default(now()) ==> now() returns the current date and time
                            -@default(false) ==> a random value matching the type of the field(Boolean).
                        -@updatedAt ==> used to give the field (of type DateTime) the datetime of the update
                         (changes automatically on update statements in sql)
                        -@unique ==> indicates that this fields must have a unique value (email, username, phone number) are example
                         of fields that requires the @unique attribute.
                        -@relation used to define a relation between two models(tables):
                            -Syntax:
                                 <Column name>   <Model name> @relation(fields: [<column name of the foreign key>], references: [<column name of the primary key])
                                 No need to worry about this one because you can write the relation from the other table like:
                                 ex:
                                    model A{
                                        id  Int @id @default(autoincrement())
                                        B   B[] // write this line and then save
                                    }
                                    if you write that and save the file prisma will automatically write the rest of the relation
                                     in the other model:
                                    ---before save:
                                        model B{
                                            id  Int @id @default(autoincrement())
                                        }
                                    ---after save:
                                        model B{
                                            id  Int @id @default(autoincrement())
                                            A   A? @relation(fields: [aId], references: [id]) // prisma adds this line
                                            aId Int?                                          // and this line
                                        }
                                Note: this defines a 1-m relation where A has multiple B and B has one A
*/

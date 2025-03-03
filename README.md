To start the project, you need to run the command: "sudo ./start-dev.sh". Maybe several times.
The project starts on 5000 port

Database data: 

- POSTGRES_USER=postgres
- POSTGRES_PASSWORD=password
- POSTGRES_DB=todo-dev
- POSTGRES_PORT=2345
- MONGO_DB=shm-chat
- MONGO_PORT=27027

## Bug fixing

Fix:
- avatar and file uploading
- refactor routes and controllers to REST API
- fix redirect unauthenticated users to login
- refactor mongoose initialization
- fix chat input

## Layout

- add how it works page 
- add link to the user menu CONTESTS/How it Works

## Dynamic branding

- add events page
- add route /events

## Button group

- add button group component

## NO-SQL DB
 
- add mongodb query at the root of the project in file req.mongodb.js

## SQL DB

- converted mongo tables to relational postgressql
- added requests to provide cashback for users

## Node.js

- created error logger server/src/errorLogger
- created a schedule to copy and clear the contents of the server/logs/error.json file, and move the data to a new file

## Fullstack
- added new role moderator
- added distribution of the moderator's decision to creative's mail

- migrate chat from Mongo to Postgres
- described Sequelize models and migrations
- changed the logic of requests on the server and client

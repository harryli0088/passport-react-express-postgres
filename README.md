# Passport React Express Postgres

An experiment with user authentication using Passport.js with React, Express, and Postgres.


## Development

Installing stuff for the first time

    npm install -g nodemon

    npm install

    cd client

    npm install



Database

    Run the sql commands in db/init.sql to initialize your database



Start development (after installing everything)

    npm run dev



## Deployment / Production
### React Client
To deploy the client, run

    npm run build

This will build the client for production into the folder client/build/

You can copy all of these files into an AWS S3 bucket and enable it for static web hosting


### Express API Server
To deploy this express api server, follow the Heroku tutorial: https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up


### Postgres Database
Set up a postgres database with AWS RDS. Set the environment variables that you see in .env when you start up the Express API Server (ex postgres host, username, password, etc)



## Environment files
- setting up dot env files for express: https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html

The .env file in this directory is for development only. It is used in queries.js to connect to the development database. In production, it is ignored, and you should instead set the environment variables through the Heroku CLI

    heroku config:set GITHUB_USERNAME=joesmith

You can read more here: https://devcenter.heroku.com/articles/config-vars


The .env in client/ is used for production only. It is ignored in development. You can read more about that here: https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables








## Tutorials
- setting up react and express: https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0

- setting up express and postgres: https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8

- setting up passport with express and postgres: https://medium.com/@timtamimi/getting-started-with-authentication-in-node-js-with-passport-and-postgresql-2219664b568c

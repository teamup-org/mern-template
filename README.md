## TODO:
* Page structure, profile page
* File upload

## Install and configure MongoDB on MacOS
This will use homebrew which can found and installed at https://brew.sh
1. Install MongoDB using the following commands
``` 
brew tap mongodb/brew
brew install mongodb-community
```
2. Run commands
```
brew services start mongodb/brew/mongodb-community
npm install
```
3. Run command: `npm run mongo:setup` to set up MongoDB database and collections.
4. **[Optional]** Run command: `npm run mongo:test` to insert test user into users collection
5. **[Optional]** Check if database, collection, and test user was created using MongoDBCompass or the mongo shell.

## Install and configure MongoDB on Windows
1. Install MongoDB at https://www.mongodb.com/try/download/community
2. Run command: `npm install` to install dependencies
3. Run command: `npm run mongo:setup` to set up MongoDB database and collections
4. **[Optional]** Run command: `npm run mongo:test` to insert test user into users collection
5. **[Optional]** Check if database, collection, and test user was created using MongoDBCompass

## To enter dev mode with React hot module replacement
1. `npm run build`
1. `npm run start:dev`

The webpack dev server (with HMR) will run here: http://localhost:8080
The server will serve a production client build from here: http://localhost:3000
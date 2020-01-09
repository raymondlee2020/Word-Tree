# World Tree

This application provide a web service based on the Express framework and a basic webhook for linebot.
The web connect Mongo Database with Monk, which can store the opinions from clients.
Use IBM Waston Service to analysis data and plant Word-Trees!

## Run the app locally

1. Create Secret.json includes your keys for Line-Bot,IBM Services, and Mongo Server
1. cd into this project's root directory
1. Run `npm install` to install the app's dependencies
1. Run `npm test` to start the app locally
1. Run `npx babel src --out-dir dist` to build the app
1. Run `npm start` to start the online version app
1. Access the running app in a browser at <http://localhost:6001>


## Bug Tracker Frontend React App

This repository contains the frontend codebase for the Bug Tracking application. The app can be configured to connect to either a local backend server or a deployed server. Additionally, instructions for running the app from local is provided and also can use deployed endpoint


## Prerequisites

- Node.js and npm installed on your system.
- Basic knowledge of React and Docker.
- Access to the Store Management backend API (local or deployed).

## Configuration Options:
## Backend Configuration:
## Local Server:

- If you want to configure the app to connect to a local backend server, open the constants.js file.
  Update the baseURL constant to "http://localhost:9191".

## Deployed Server:

- If you want to configure the app to connect to a deployed backend server, open the api.js file in services folder then,Update the baseURL to 'https://bug-tracker-zdic.onrender.com'.

## Doc for endpoints
- 'https://bug-tracker-zdic.onrender.com/swagger-ui/index.html'


## Running the App:
## Local Development:

- Navigate to your project directory in the terminal.
- Run npm install to install dependencies.
- Start the development server with npm start.
- Access the app at http://localhost:3000.


## Access the App
Once the containers are up and running, you can access the Store Management app by opening your web browser and visiting http://localhost:3000.

## For Login use defualt admin 

- userName: john@admin.com
- password: 123456

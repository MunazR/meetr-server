# meetr-server
Backend for Meetr.io (DeltaHacks 2016)

## Description
Meetr is an application aimed to improve sustainability by adjusting the temperature in office rooms using Nest. Users can book meeting rooms in the workplace through the companion Android app. Meetr will automatically warm up the meeting room to an appropriate temperature and unlock the door to the room using Nest cloud services. After the meeting is complete Meetr will automatically lock the door and readjust the temperature on the Nest thermostat to conserve energy.

View the companion Android app [here](https://github.com/marwanad/Meetr)!

## Starting Server
You will first need to install [Node](https://nodejs.org/en/) and have a an instance of [MongoDB](https://www.mongodb.org/) running. To start up the application adjust the [configuration](https://github.com/MunazR/meetr-server/blob/master/config.json) file with your own database credentials. Use the following commands to start up the Meetr server.

```sh
npm install 
npm start
```

Meetr Server uses the following

+ Node.js
+ MongoDB
+ Express.js
+ HTML/CSS/Javascript (Frontend)

## Contributors
Meetr was developed during [DeltaHacks](http://deltahacks.com/) 2016.

+ [Munaz Rahman](https://github.com/MunazR) - Backend
+ [Tim Mui](https://github.com/timmui) - Hardware
+ [Marwan Ahmed](https://github.com/marwanad) - Android
+ [Abdallah Arar](https://github.com/abdallaharar) - Frontend

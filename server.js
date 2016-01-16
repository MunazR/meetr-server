var express = require('express');
var routes = require('./routes/app');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/meetr');

var app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
  req.db = db;
  next();
});

app.get('/health', routes.getHealth);
app.get('/meetingRooms', routes.getAllMeetingRooms);
app.post('/meetingRoomById', routes.getAllMeetingRoomsById);
app.post('/bookMeetingRoomById', routes.bookMeetingRoomById);
app.post('/addMeetingRoom', routes.addMeetingRoom);

app.listen(3000);
console.log('Listening on port 3000...');

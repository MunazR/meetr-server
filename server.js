var express = require('express');
var routes = require('./routes/app');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var monk = require('monk');
var config = require('./config');
var db = monk(config.db.user + ":" +
  config.db.password + "@" + config.db.uri + ':' + config.db.port + '/' + config.db.name);
var port = process.env.PORT || config.port;
var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(function(req, res, next) {
  req.db = db;
  next();
});

app.get('/health', routes.getHealth);
app.get('/meetingRooms', routes.getAllMeetingRooms);
app.get('/unlockDoor', routes.unlockDoor);
app.post('/meetingRoomById', routes.getAllMeetingRoomsById);
app.post('/bookMeetingRoomById', routes.bookMeetingRoomById);
app.post('/addMeetingRoom', routes.addMeetingRoom);

app.listen(port);
console.log('Listening on port ' + port + '...');

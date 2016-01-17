var schedule = require('node-schedule');
var http = require('http');

exports.getHealth = function(req, res) {
  res.send(200, {
    server: "OK"
  });
};

exports.getAllMeetingRooms = function(req, res) {
  var db = req.db;
  var collection = db.get('meetingRooms')
  var query = {};

  collection.find(query, function(err, data) {
    if (err) {
      return res.send(500, {
        status: "Error",
        message: "An error occurred: " + err.message
      });
    }

    if (!data || data.length === 0) {
      return res.send(200, {
        status: "OK",
        message: "No rooms found",
        data: data
      });
    }

    res.send(200, data);
  });
};

exports.getAllMeetingRoomsById = function(req, res) {
  var db = req.db;
  var collection = db.get('meetingRooms')
  var id = req.body.id;

  collection.findById(id, function(err, data) {
    if (err) {
      return res.send(500, {
        status: "Error",
        message: "An error occurred: " + err.message
      });
    }

    if (!data) {
      return res.send(200, {
        status: "OK",
        message: "No room found with that id",
        data: data
      });
    }

    res.send(200, {
      status: "OK",
      data: data
    });
  });
};

exports.addMeetingRoom = function(req, res) {
  var db = req.db;
  var collection = db.get('meetingRooms');
  var room = req.body;

  collection.insert(room, function(err, data) {
    if (err) {
      return res.send(500, {
        status: "Error",
        message: "An error occurred: " + err.message
      });
    }

    res.send(200, {
      status: "OK",
      message: "Added room",
      data: data
    });
  });
};

exports.bookMeetingRoomById = function(req, res) {
  var db = req.db;
  var collection = db.get('meetingRooms');
  var roomId = req.body.id;
  var startTime = new Date(req.body.startTime);
  var endTime = new Date(req.body.endTime);
  var userId = req.body.userId;
  var query = {
    _id: roomId
  };

  var booking = {
    startTime: startTime,
    endTime: endTime,
    userId: userId
  };

  var update = {
    "$push": {
      bookings: booking
    }
  };

  collection.update(query, update, function(err, data) {
    if (err) {
      return res.send(500, {
        status: "Error",
        message: "An error occurred: " + err.message
      });
    }

    res.send(200, {
      status: "OK",
      message: "Added booking",
      data: data
    });
  });

  var date = new Date(startTime - 600000);
  schedule.scheduleJob(date, function() {
    http.get({
      host: 'maker.ifttt.com',
      path: '/trigger/temp_on/with/key/bYMyY5nnx8XpYK4gqwy7Bj'
    }, function(response) {
      console.log('Turned temperature on');
    });
  });

  console.log("Temperature scheduled to turn on at " + date.toLocaleString());

  schedule.scheduleJob(endTime, function() {
    http.get({
      host: 'maker.ifttt.com',
      path: '/trigger/temp_off/with/key/bYMyY5nnx8XpYK4gqwy7Bj'
    }, function(response) {
      console.log('Turned temperature off');
    });

    http.get({
      host: 'maker.ifttt.com',
      path: '/trigger/door_lock/with/key/bYMyY5nnx8XpYK4gqwy7Bj'
    }, function(response) {
      console.log('Locked door');
    });
  });
};

exports.unlockDoor = function(req, res) {
  return http.get({
    host: 'maker.ifttt.com',
    path: '/trigger/door_unlock/with/key/bYMyY5nnx8XpYK4gqwy7Bj'
  }, function(response) {
    console.log('Unlocked door');

    return res.send(200, {
      status: "OK",
      message: "Door unlocked"
    });
  });
};

exports.getHealth = function(req, res) {
  res.send(200, {
    server: "OK"
  });
};

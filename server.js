var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  path = require('path');

//getting the configured REST routing
var routes = require('./api/routes/travelPlanningRoutes'); //importing route
routes(app); //register the route

app.use(express.static(__dirname + '/frontend'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/index.html'));
});

// server listening on the specified port
app.listen(port, function () {
  console.log('RoutePlanner started on port: ' + port);
});
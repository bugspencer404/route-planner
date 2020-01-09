'use strict';
module.exports = function(app) {
  var travelPlanningList = require('../controllers/travelPlanningController');

  // get the travel
  app.route('/travel/:type/:start/:destination/')
    .get(travelPlanningList.getTravel);

  app.route('/mapgraph/')
    .post(travelPlanningList.postMap);
};
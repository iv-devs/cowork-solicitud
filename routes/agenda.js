var express = require('express');
var router = express.Router();

var Agenda = require('../models/agenda');

function addDays( adds ){
  var today = new Date();
  return new Date().setDate(today.getDate() + adds);
}

/* GET listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET agenda listing. */
router.get('/data', function(req, res, next) {
  Agenda.find(function(err, data) {
    if (err) res.send(err);

    res.json(data);
  });
});

/*TODO: Change to post*/
router.get('/request', function(req, res, next) {
  var agenda = new Agenda();

  // set the user's local credentials
  agenda.title = 'test';
  agenda.allDay = false;
  agenda.start = addDays(0);
  agenda.end = addDays(2);
  agenda.url = 'http://google.cl';

  // save the user
  agenda.save(function(err) {
      if (err){
          console.log('Error in Saving user: '+err);
          throw err;
      }
      console.log('User Registration succesful');
      res.json(agenda);
  });
});
module.exports = router;

var express = require('express');
var router = express.Router();

var Agenda = require('../models/agenda');

function addDays( adds ){
  var today = new Date();
  return new Date().setDate(today.getDate() + adds);
}

/* GET listing. */
router.get('/', function(req, res, next) {
  res.render('agendar', { title: 'La Brujula Cowork - Agenda' });
});

/* GET agenda listing. */
router.get('/data', function(req, res, next) {
  Agenda.find(function(err, data) {
    if (err) res.send(err);

    res.json(data);
  });
});

/*TODO: Change to post*/
router.post('/request', function(req, res, next) {
  var agenda = new Agenda();
  console.log(req.body);

  // set the agenda's local credentials
  agenda.title = req.body.txfTitle;
  agenda.allDay = false;
  agenda.start = new Date(req.body.txfDateStart);
  agenda.end = new Date(req.body.txfDateEnd);
  agenda.url = req.body.txfUrl;
  agenda.status = 1;

  // save the request
  agenda.save(function(err) {
      if (err){
          console.log('Error in Saving request: '+err);
          throw err;
      }
      console.log('Request Registration succesful');
      console.log(agenda);
      res.redirect('/');
  });
});
module.exports = router;

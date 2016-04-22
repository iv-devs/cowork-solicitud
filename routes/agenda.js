var express = require('express');
var router = express.Router();

var Agenda = require('../models/agenda');
var isAuthenticated = require('../middlewares/auth_middleware');

/* GET listing. */
router.get('/', isAuthenticated, function(req, res, next) {
  res.render('agendar', { title: 'La Brujula Cowork - Agenda' });
});

/* GET agenda listing. */
router.get('/data', function(req, res, next) {
  Agenda.find({
    status: 2
  }, function(err, data) {
    if (err) res.send(err);

    res.json(data);
  });
});

/*TODO: Change to post*/
router.post('/request', isAuthenticated, function(req, res, next) {
  var agenda = new Agenda();
  console.log(req.body);

  // set the agenda's local credentials
  var fechas = req.body.txfFechas.split(' - ');
  agenda.title = req.body.txfTitle;
  agenda.allDay = false;
  agenda.start = new Date(fechas[0]);
  agenda.end = new Date(fechas[1]);
  agenda.url = req.body.txfUrl;
  agenda.status = 1;
  agenda.details = req.body.txaDetails;
  agenda.noAttendees = req.body.noAttendees;

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

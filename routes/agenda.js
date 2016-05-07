var express = require('express');
var router = express.Router();

var Event = require('../models/event');
var isAuthenticated = require('../middlewares/auth_middleware');

/* GET create view */
router.get('/', isAuthenticated, function(req, res, next) {
  var user = ( req.user ) ? req.user : null;
  if ( user !== null)
    user.fullname = user.firstName + ' ' + user.lastName;

  res.render('solicitar', { title: 'La Brujula Cowork - Agenda', user: user });
});

/* GET agenda listing. */
router.get('/data', function(req, res, next) {
  var isAdminLogged = ( req.user && req.user.rol == 'admin' ) ? true : false;
  var findStatus = ( isAdminLogged ) ? [1,2] : 2;

  Event.find({
    status: { "$in" : findStatus}
  }, function(err, data) {
    if (err){
      console.log(err);
      res.send(err);
    }

    res.json(data);
  });
});

router.post('/request', isAuthenticated, function(req, res, next) {
  var newEvent = new Event();
  console.log(req.body);
  var fechas;

  if ( req.body.txfFechas )
    fechas = req.body.txfFechas.split(' - ');
  else if (req.body.hdnStart && req.body.hdnEnd) {
    fechas = [];
    fechas[0] = req.body.hdnStart;
    fechas[1] = req.body.hdnEnd;
  }else {
    res.json(req.body);
  }

  newEvent.title = req.body.txfTitle;
  newEvent.allDay = false;
  newEvent.start = new Date(fechas[0]);
  newEvent.end = new Date(fechas[1]);
  newEvent.url = req.body.txfUrl;
  newEvent.status = 1;
  newEvent.details = req.body.txaDetails;
  newEvent.noAttendees = req.body.noAttendees;

  // save the request
  newEvent.save(function(err) {
      if (err){
          console.log('Error in Saving request: '+err);
          throw err;
      }
      console.log('Request Registration succesful');
      console.log(newEvent);
      res.redirect('/');
  });
});

router.get('/:slug', function(req, res, next) {
  var isAdminLogged = ( req.user && req.user.rol == 'admin' ) ? true : false;
  console.log(isAdminLogged);
  var user = ( req.user ) ? req.user : null;
  if ( user !== null)
    user.fullname = user.firstName + ' ' + user.lastName;

  Event.findOne({slug: req.params.slug}, function(err, data){
    if (err){
      console.log( err );
      res.send( err );
    }
    var eventData = data;
    res.render('agendar', { title: 'La Brujula Cowork - Agenda', user: user, event: eventData, isAdminLogged: isAdminLogged });
  });

});

module.exports = router;

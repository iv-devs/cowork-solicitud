var express = require('express');
var fs = require('fs');
var router = express.Router();

var Event = require('../models/event');
var Auth  = require('../middlewares/auth_middleware');
var tpl   = require('../helpers/tpl_helper').Tpl;
var mail  = require('../helpers/mail_helper').Mail;

var sendEmail = function(type, event){

  var to      = 'contacto@ivdevs.com'; //['karina.salas@codesser.cl','valentina.cortes@codesser.cl'] ,
  var from    = event.userRequest.email;
  var fromName= event.userRequest.name;


  var subject = 'Actualización de Solicitud Cowork - La Brújula',
      tpl_file= '',
      data;

  switch (type) {
    case 'accepted':
        tpl_file = 'request_accepted.html';
      break;
    case 'rejected':
        tpl_file = 'request_rejected.html';
      break;
    case 'request':
        tpl_file     = 'request_sended.html';
        subject = 'Nueva solicitud de espacio';
        data = {ACTIVIDAD: event.title, FECHA: event.start};
      break;
    case 'request_user':
        tpl_file     = 'request_sended_user.html';
        subject = 'Nueva solicitud de espacio';
        to = event.userRequest.email;
        from = 'contacto@ivdevs.com';
        fromName = 'La Brújula Solicitudes';
        data = {ACTIVIDAD: event.title, NOMBRE: event.userRequest.name, URL: 'http://localhost:3000/'};
      break;
  }

  tpl.build(tpl_file, data, function (err, body) {
    if (err){ console.log('Error : '+err); throw err; }

    mail.send(fromName, from, to, subject, body, function(err, json){
      console.log(json);
    });

  });
};

router.get('/test', function(req, res, next){
  var data = {
    title:' The Test final',
    start: new Date(),
    userRequest : {
      name: 'juanito',
      email: 'contacto@ivdevs.com'
    }
  };

  sendEmail('request', data);
});
/* GET create view */
router.get('/', Auth.isAuthenticated, function(req, res, next) {
  var user = ( req.user ) ? req.user : null;
  res.render('request', { title: 'La Brujula Cowork - Agenda', user: user });
});

/* GET agenda listing. */
router.get('/data', function(req, res, next) {
  var isAdminLogged = ( req.user && req.user.rol == 'admin' ) ? true : false;
  var findStatus = ( isAdminLogged ) ? ['pending','accepted'] : 'accepted';

  var filters = {
    status: { "$in"   : findStatus}
  };

  var start = new Date(req.query.start + ' 00:00:00');
  var end = new Date(req.query.end + ' 23:59:59');
  filters.start = { "$gte"  : start, "$lte"  : end};

  console.log(filters);
  Event.find(filters, function(err, data) {
    if (err){ console.log(err); res.send(err); }

    console.log('fetching ' + data.length + ' events');
    res.json(data);
  });
});

/* POST create request to cowork. */
router.post('/request', Auth.isAuthenticated, function(req, res, next) {
  var user = ( req.user ) ? req.user : null;
  var newEvent = new Event();

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
  newEvent.status = 'pending';
  newEvent.details = req.body.txaDetails;
  newEvent.noAttendees = req.body.noAttendees;
  //userdata
  newEvent.userRequest.name = user.fullname;
  newEvent.userRequest.email = user.email;
  newEvent.userRequest.organization = user.organization;

  // save the request
  newEvent.save(function(err) {
      if (err){ console.log('Error in Saving request: '+err); throw err; }

      console.log('Request Registration succesful');
      sendEmail('request', newEvent);
      sendEmail('request_user', newEvent);
      res.redirect('/');
  });
});

router.get('/:slug', function(req, res, next) {
  var user = ( req.user ) ? req.user : null;
  var isAdminLogged = ( user && user.rol == 'admin' ) ? true : false;

  Event.findOne({slug: req.params.slug}, function(err, data){
    if (err){ console.log( err ); res.send( err ); }

    var eventData = data;
    req.flash('info');
    if (data !== null)
      req.flash('info', data._id);
    res.render('agendar', { title: 'La Brujula Cowork - Agenda', user: user, event: eventData, isAdminLogged: isAdminLogged });
  });

});

router.post('/finish-request', Auth.isAdminAuthenticated, function(req, res, next) {
  var user = ( req.user ) ? req.user : null;
  var event_data = {
    comment: req.body.comment,
    status : req.body.action,
    id: req.flash('info')
  };

  if ( ( event_data.status == "accepted" || event_data.status == "rejected" ) && event_data.id !== undefined ) {
    var update_data = {
      status: event_data.status,
      userFinish: {
        name: user.fullname,
        email: user.email,
        comment: event_data.comment
      }
    };
    Event.update({ _id: event_data.id }, update_data, function(err, affected){
      if (err){ console.log( err ); res.send( err ); }

      event_data.affected = affected;
      console.log(event_data);
      if ( affected.ok > 0){
        //TODO: Send mail accepted/rejected
      }
      res.json(event_data);
    });

  }else{
    //Solicitud modificada, intentaron hacer trampa y cambiaron los valores del btn action :P
    // o el id del evento en la flashdata caduco
    res.status(400).render('errors/400');
  }
});

module.exports = router;

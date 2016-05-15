var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var user = ( req.user ) ? req.user : null;
  res.render('index', { title: 'La Brujula Cowork - Agenda', user: user });
});

module.exports = router;

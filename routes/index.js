var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/logs', function(req, res, next) {
	res.render('log', { title: 'UHF RFID LOGS' });
});


module.exports = router;

var express = require('express');
var app = express();
var router = express.Router();

/* GET taglist. */
app.get('/logs',function(req,res){
  res.sendFile('/log.html');
});
router.get('/loglist', function(req, res) {
  var db = req.db;
  var collection = db.get('logs');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });
});

/* POST to addtag. */
router.post('/addlog', function(req, res) {
  var db = req.db;
  var collection = db.get('logs');
  collection.insert(req.body, function(err, result){
    res.send(
      (err === null) ? { msg: '' } : { msg: err }
    );
  });
});

/* DELETE to deleteuser. */
router.delete('/deletelog/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('logs');
  var tagToDelete = req.params.id;
  collection.remove({ '_id' : tagToDelete }, function(err) {
    res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
  });
});

module.exports = router;

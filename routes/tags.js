var express = require('express');
var router = express.Router();

/* GET taglist. */
router.get('/taglist', function(req, res) {
  var db = req.db;
  var collection = db.get('tags');
  collection.find({},{},function(e,docs){
    res.json(docs);
  });
});

/* DELETE to deleteuser. */
router.delete('/deletetag/:id', function(req, res) {
  var db = req.db;
  var collection = db.get('tags');
  var tagToDelete = req.params.id;
  collection.remove({ '_id' : tagToDelete }, function(err) {
    res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
  });
});

module.exports = router;

'use strict';

var mongoose = require('mongoose');

var Tag = mongoose.model('Tags');

exports.tags = function(req, res) {
  Tag.find({}, function(err, tag) {
    if (err)
      res.send(err);
    res.json(tag);
  });
};

exports.add = function(req, res) {
  var new_tag = new Tag(req.body);
  new_tag.save(function(err, tag) {
    if (err)
      res.send(err);
    res.json(tag);
  });
};

exports.gettag = function(req, res) {
  Tag.findById(mongoose.Types.ObjectId(req.query.tagId), function(err, tag) {
    if (err)
      res.send(err);
    res.json(tag);
  });
};

exports.update = function(req, res) {
  var id = mongoose.Types.ObjectId(req.query.tagId);
  Tag.findOneAndUpdate({_id: id}, req.body, {new: true}, function(err, tag) {
    if (err)
      res.send(err);
    res.json(tag);
  });
};

exports.delete = function(req, res) {
  var id = mongoose.Types.ObjectId(req.query.tagId);
  Tag.remove({
    _id: id
  }, function(err, tag) {
    if (err)
      res.send(err);
    res.json({ message: 'Tag deleted successfully' });
  });
};


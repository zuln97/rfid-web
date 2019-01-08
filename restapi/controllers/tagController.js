'use strict';
require('./../models/tagModel.js');

const mongoose = require('mongoose');
const Tags = mongoose.model('Tags');
const Logs = mongoose.model('Logs');

module.exports.getalltags = (req, res)=>{
    Tags.find({}, (err, docs)=>{
        if(err) return res.send(err);
        return res.json(docs);
    })
}

module.exports.getspecifictag = (req, res)=>{
    Tags.find({"EPC": req.params.EPC.toString()}, (err, docs)=>{
        if(err) return res.send(err);
        return res.json(docs);
    })
}


module.exports.sendtag = (req, res)=>{
    const tag = req.body;
    const newlog = new Logs(tag);
    tag.Date = new Date();
    newlog.save();
    Tags.findOneAndUpdate({"EPC": tag.EPC}, req.body, {new: true}, function(err, docs) {
        if (err) return res.send(err);
        if (docs) return res.json(docs);
        
        var newtag = new Tags(tag);
        newtag.save();
        return res.json(newtag);
    });
    
}

module.exports.getlogs = (req, res)=>{
    Logs.find({}, (err, docs)=>{
        if(err) return res.send(err);
        return res.json(docs);
    })
}


'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const TagSchema = new Schema({
	Ant_Id: { type: String},

	PC: { type: String, required:  'PC cannot be left blank.' },
  
	EPC:    { type: String, required:  'EPC cannot be left blank.'},

	Date:  {type: Date, default: Date.now }
});

mongoose.model('Tags', TagSchema);

//
var LogSchema = new Schema({
	Ant_Id: { type: String},

	PC: { type: String, required:  'PC cannot be left blank.' },
  
	EPC:    { type: String, required:  'EPC cannot be left blank.'},

	Date:  {type: Date, default: Date.now }
});

mongoose.model('Logs', LogSchema);
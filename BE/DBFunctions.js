
'use strict';

const mongoose = require('mongoose');

const uri = 'mongodb:://Yumit:yumit@ds161793.mlab.com:61793/yumit';

const Schema = mongoose.Schema;

const ShipSchema = new Schema({
  IMO: { type : String, default : '' },
  MMSI: { type : String, default : '' },
  type: { type : Number },
  year: { type : Number },
  sizes: [{ Height: { type: Number },
    Width: { type: Number },
    Weight: { type: Number }
  }],
});

const CourseSchema = new Schema({
   shipIMO:  { type : String, default : ''},
   SUF: { type : Number },
   DFS: { type : Number },
   exitPort: { type : String, default : '' },
   exitTime: { type : Date, default : Date.now },
   arrivalPort: { type : String, default : '' },
   arrivalTime: { type : Date, default : Date.now },
   sailCourse: { type : Number },
   sailSpeed: { type : Number }
 });

const CellsSchema = new Schema({
	owner: { type: String }
})

var shipModel = mongoose.model("shipModel", ShipSchema);
var courseModel = mongoose.model("courseModel", CourseSchema);

// grab the ship model
var Ship = require('./app/models/ship');
// grab the course model
var Course = require('./app/models/course');

ShipSchema.path('IMO').required(true, 'IMO cannot be blank');
ShipSchema.path('MMSI').required(true, 'MMSI cannot be blank');
CourseSchema.path('shipIMO').required(true, 'shipIMO cannot be blank');

shipSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

courseSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

//connect to the db
function Connect() {
  mongoose.connect(uri);
}

//close connection
function close() {
  mongoose.close();
}

//get ship by IMO
function getShip(IMO) {
	shipModel.findOne( { IMO: IMO } );
}

//get course by shipIMO
function getCourses(shipIMO) {
	courseModel.all( { shipIMO: shipIMO } );
}

// save the ship
shipModels.save(function(err) {
  if (err) throw err;

  console.log('User created!');
});

// save the course
courseModels.save(function(err) {
  if (err) throw err;

  console.log('Course created!');
});

function coursesBetween(IMO, date1, date2) {

Ship.find({ IMO: IMO }).find(createdAt: {
    $gte: date1,
    $lt: date2
  }).exec(function(err, users) {
  if (err) throw err;

  console.log(users);
});
}

ship.findOneAndRemove({ IMO: IMO }, function(err) {
  if (err) throw err;
  course.findAndRemove({ shipIMO: shipIMO }, function(err) {
  if (err) throw err;
});
  // we have deleted the ship
  console.log('Ship deleted!');
});


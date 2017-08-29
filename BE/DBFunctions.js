'use strict';

const mongoose = require('mongoose');

const uri = 'mongodb:://Yumit:yumit@ds161793.mlab.com:61793/yumit';

const Schema = mongoose.Schema;

const ShipSchema = new Schema({
    IMO: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    type: {
        type: Number
    },
    year: {
        type: Number
    },
    sizes: {
        type: String
    },
    gt: {
        type: Number
    },
    country: {
        type: String
    },
});

/* json
{
"imo": "9279252",
"name": "AMATZIA II",
"type": "Tug",
"dest": "HAIFA PORT TUG",
"etastamp": "Feb 07, 06:28",
"ship_speed": 2,
"ship_course": 174.6,
"timestamp": "Aug 28, 2017 18:19 UTC",
"year": 2003,
"gt": 363,
"sizes": "30 x 11 m",
"country": "Israel (ISR)"
}
*/

const CourseSchema = new Schema({
    shipIMO: {
        type: String,
        default: ''
    },
    dest: {
        type: String,
        default: ''
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    etastamp: {
        type: Date,
        default: Date.now
    },
    ship_course: {
        type: Number
    },
    ship_speed: {
        type: Number
    }
});

const CellsSchema = new Schema({
    owner: {
        type: String
    }
})

var shipModel = mongoose.model("shipModel", ShipSchema);
var courseModel = mongoose.model("courseModel", CourseSchema);
//
// // grab the ship model
// var Ship = require('./app/models/ship');
// // grab the course model
// var Course = require('./app/models/course');
//
// ShipSchema.path('IMO').required(true, 'IMO cannot be blank');
// ShipSchema.path('MMSI').required(true, 'MMSI cannot be blank');
// CourseSchema.path('shipIMO').required(true, 'shipIMO cannot be blank');

ShipSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

CourseSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

module.exports = {
    //connect to the db
    Connect: function() {
        mongoose.connect(uri);
    },

    //close connection
    close: function() {
        mongoose.close();
    },

    //get ship by IMO
    getShip: function(IMO) {
        shipModel.findOne({
            IMO: IMO
        });
    },

    //get course by shipIMO
    getCourses: function(shipIMO) {
        courseModel.all({
            shipIMO: shipIMO
        });
    },

    // save the ship
    insert: function(ship) {
        var shipObj = JSON.parse(ship);
        var ship = new shipModel({
            IMO: shipObj.imo,
            name: shipObj.name,
            type: shipObj.type,
            year: shipObj.year,
            sizes: shipObj.sizes,
            gt: shipObj.gt,
            country: shipObj.country
        });
        ship.save(function(err) {
            if (err) throw err;
        });
        var course = new courseModel({
            shipIMO: shipObj.imo,
            dest: shipObj.dest,
            timestamp: shipObj.timestamp,
            etastamp: shipObj.etastamp,
            ship_course: shipObj.ship_course,
            ship_speed: shipObj.ship_speed
        });
        course.save(function(err) {
            if (err) throw err;
        });
    },

    // coursesBetween: function(IMO, date1, date2) {
    //     Ship.find({
    //         IMO: IMO
    //     }).find(createdAt: {
    //         $gte: date1,
    //         $lt: date2
    //     }).exec(function(err, users) {
    //         if (err) throw err;
    //     });
    // },

    delete: function(IMO) {
        ship.findOneAndRemove({
            IMO: IMO
        }, function(err) {
            if (err) throw err;
            course.findAndRemove({
                shipIMO: shipIMO
            }, function(err) {
                if (err) throw err;
            });
            // we have deleted the ship
            console.log('Ship deleted!');
        });
    }

};
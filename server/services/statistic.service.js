var statistics  = require('../models/Statistic.model');
var motels      = require('../models/Motel.model');
var users       = require('../models/User');
var Q           = require('q');
var _           = require('lodash'); 
var service     = {};
var moment      = require('moment');
service.create = create;
module.exports = service;

function create() {
    var deferred = Q.defer();

    let statistic = {
        num_motels:  0,
        num_users:   0,
        visitors:   0,
        created_at: Date.now()
    }
  

    var d = new Date();
    var n = d.getDate();
   console.log(moment().daysInMonth());
    deferred.resolve();
    // motels.count({}, function (err, rs) {
    //     if (err) {
    //         deferred.reject(err.name + ': ' + err.message);
    //     }

    //     statistic.num_motels = Number.parseInt(rs);

    //     users.count({}, function (err, rs) {
    //         if (err) {
    //             deferred.reject(err.name + ': ' + err.message);
    //         }
    
    //         statistic.num_users = Number.parseInt(rs);
            
    //         statistics.create(statistic, function(err, item) {
    //             if (err) {
    //                 deferred.reject(err.name + ': ' + err.message);
    //             }
        
    //             deferred.resolve(item);
    //         });
    //     });
    // });

    
   
    

    return deferred.promise;
}
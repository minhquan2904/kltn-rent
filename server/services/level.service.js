var levels = require('../models/Level.model');
var Q = require('q');

var service = {};
service.getAll = getAll;
service.create = create;
service.update = update;
module.exports = service;
function getAll() {
    var deferred = Q.defer();

    levels.find().exec(function(err, levels) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        deferred.resolve(levels);
    });

    return deferred.promise;
}

function create(levelParam) {
    var deferred = Q.defer();

    levels.findOne(
        {num: levelParam.num}, 
        function(err, level) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if(level) {
                deferred.reject("Level is already exist");
            } else {
                createLevel();
            }
        }
    );

    function createLevel() {
        levels.create(levelParam, function(err, level) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        })
    };

    return deferred.promise;
}

function update(levelParam) {
    var deferred = Q.defer();

    levels.findOne(
        {num: levelParam.num}, 
        function(err, level) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if(level) {
                level.exp = levelParam.exp;
                level.save(function(err, level) {
                    if (err) deferred.reject(err.name + ': ' + err.message);
                    
                    deferred.resolve();
                })
            } else {
                deferred.reject("level not found");
            }
        }
    );

    return deferred.promise;
}
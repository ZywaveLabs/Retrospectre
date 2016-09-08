/* global Logs:true Logger:true */

Logs = new Mongo.Collection("log"); // eslint-disable-line

Logger = {};

Logger.Log = function(logObject) {
    Logs.insert(logObject);
};

Logger.AddInfo = function(id, key, info) {
    var log = Logs.findOne({_id: id});

    if(log){
        var inf = log.info;

        inf[key] = info;
        Logs.update({_id: id}, {$set:{
            info: inf
        }});
    }

};

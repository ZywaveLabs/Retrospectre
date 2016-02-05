"use strict";
/*
var log = true;

if(Meteor.isServer && log) {
    var fs = Npm.require("fs");
    var __ROOT_APP_PATH__ = fs.realpathSync(".");
    var file = String(__ROOT_APP_PATH__) + "\\" +
        String(moment().format()) + ".log";

    Meteor.startup(function () {
        console.log("Logger loading, logging to:\n" + file);
        fs.open(file, "a", function(err, fd){
            if(!err){
                fd.write(String(moment().format()) + "::Logfile Created",
                    function(){});
            }
        });
    });

    Meteor.methods({
        logError: function(error) {
            fs.open(file, "a", function(err, fd){
                if(!err){
                    fd.write(String(moment().format()) + "::ERROR::" +
                        String(error) + "\n", function(){});
                }
            });
        },
        logText: function(msg) {
            fs.open(file, "a", function(err, fd){
                if(!err){
                    fd.write(String(moment().format()) + "::" + String(msg) +
                        "\n", function(){});
                }
            });
        }
    });
}
*/

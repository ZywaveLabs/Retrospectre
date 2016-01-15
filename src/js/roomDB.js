"use strict";
/**
*@author TreJon House
*@date 1/14/16
*@version 1.0
*@edited 1/14/16
*@purpose Display room
**/
var lastRoom;
var ROOMS = new Mongo.Collection("rooms");

if(Meteor.isClient) {
    Template.createRoom.events({
        "hover h1": function(e){
            alert("The last room is " + lastRoom);
        }
    });
}
if(Meteor.isServer) {
    Meteor.startup(function (){
        var roomList = ROOMS.find({},{sort: {id: -1}}).fetch();

        lastRoom = roomList[0].id;
    });
}

"use strict";
/**
*@author TreJon House
*@date 1/14/16
*@version 1.0
*@edited 1/14/16
*@purpose Display room
**/
var lastRoom;
var newRoomAssignment;
var ROOMS = new Mongo.Collection("rooms");
if(Meteor.isClient)
{
	Template.landingPage.events({
		"click #createRoom": function(event){
			findLastRoom();
			if(lastRoom==null || lastRoom==undefined)
				newRoomAssignment=0;
			else
				newRoomAssignment=lastRoom+1;
			ROOMS.insert({
				id: newRoomAssignment,
				dateCreated: new Date()
			});	
		},
		"click #joinRoom": function(event){
				var roomNumber = prompt('Enter the designated room number.');
				if(roomNumber != null && isInt(roomNumber))
					Router.go('/room',{id:roomNumber},{});
				else
					alert('An invalid room number was given, either ask for the number or create a new room.');
					
			}
	});
}
if(Meteor.isServer)
{
	Meteor.startup(findLastRoom);
}

function findLastRoom(){	
		var roomList = ROOMS.find({},{sort: {id: -1}}).fetch();
		if(roomList.length>0)
			lastRoom = roomList[0].id;
		else
			lastRoom = null;
}

function isInt(n){
    return Number(n) === n && n % 1 === 0;
}

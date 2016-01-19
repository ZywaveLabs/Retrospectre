"use strict";
/**
*@author TreJon House
*@date 1/14/16
*@version 1.0
*@edited 1/18/16
*@purpose find last room added to server and route to desired room if available
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
				roomNumber = parseInt(roomNumber);
				if(roomNumber != null && !NaN)
					Router.go('/room',{_id:roomNumber},{});
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


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
			//add a new room to the inventory
			ROOMS.insert({
				id: newRoomAssignment,
				dateCreated: new Date()
			});	
			alert('Your room number is '+newRoomAssignment);
		},
		"click #joinRoom": function(event){
				//ask for the desired room number
				var roomNumber = prompt('Enter the designated room number.');
				//parse it
				roomNumber = parseInt(roomNumber);
				//validate the room number
				if(roomNumber != null && !NaN && isARoom(roomNumber)){
					Session.set('roomNumber',roomNumber);
					Router.go('/room',{_id:roomNumber},{});
				}
				else
					alert('An invalid room number was given, either ask for the number or create a new room.');
					
			}
	});
}
if(Meteor.isServer)
{
	Meteor.startup(findLastRoom);
}

/**
*@author TreJon House
*@purpose find the last room added to the database
*so we can add a new room with the proper id
**/
function findLastRoom(){	
		var roomList = ROOMS.find({},{sort: {id: -1}}).fetch();
		if(roomList.length>0)
			lastRoom = roomList[0].id;
		else
			lastRoom = null;
}

/**
*@author TreJon House
*@purpose verifying there is a room with the given id
**/
function isARoom(roomId){
	return ROOMS.find({id:roomId},{});
}


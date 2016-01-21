/**
*@author TreJon House
*@date 1/18/16
*@verion 1.0
*@edited 1/18/16
*@purpose Once the room page is rendered, need to connect to
*the cards in current room and display them
**/
<<<<<<< HEAD
Cards = new Mongo.Collection('cards');
if(Meteor.isClient){
	if(window.location.href.search('room')!=-1){
		Template.room.helpers({
			cards : function(){
			while(Session.get('roomNumber') == undefined || parseInt(Session.get('roomNumber')) ==NaN)
				Session.set('roomNumber',prompt('Enter the designated room number.'));
			//return all cards in db sort by newest
		    	return Cards.find({roomCode:Session.get('roomNumber')},{sort: {createdAt: -1}});
			}
		});
		//will handle the events of the page
		Template.room.events({
			"click .btn-default": function(event){
					event.preventDefault();					
				while(Session.get('roomNumber') == undefined || parseInt(Session.get('roomNumber')) ==NaN)
					Session.set('roomNumber',prompt('Enter the designated room number.'));
					Cards.insert({
						roomCode:Session.get('roomNumber'),
						category: $('input:checkbox').val(),
						createdAt: new Date(),
						text: $('.thoughts').val()
					});
					$(".thoughts:text").val("");
				}
		});
		console.log(Cards.find({roomCode:Session.get('roomNumber')},{sort: {createdAt: -1}}).fetch());
		}
}
if(Meteor.isServer){
}
=======

"use strict";

var Cards = new Mongo.Collection("cards");

if(Meteor.isClient){
    Template.room.helpers({
        cards : function(){
        //return all cards in db sort by newest
        //    return Cards.find({roomID: roomId},{sort: {createdAt: -1}});
        }
    });
    //will handle the events of the page
    Template.room.events({
    });
}
>>>>>>> origin/createRoom

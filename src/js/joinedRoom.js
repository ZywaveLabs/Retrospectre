/**
*@author TreJon House
*@date 1/18/16
*@verion 1.0
*@edited 1/18/16
*@purpose Once the room page is rendered, need to connect to
*the cards in current room and display them
**/
var roomId;
Cards = new Mongo.Collection('cards');
if(Meteor.isClient){
	/*while(roomId == null || roomId == NaN || parseInt(roomId))*/
	if(window.location.href.search('room')!=-1)
		this.roomId=Session.get('roomId');
	Template.card.helpers({
		cards : function(){
		//return all cards in db sort by newest
	    	return Cards.find({roomNumber:this.roomId},{sort: {createdAt: -1}});
		}
	});
	console.log(Cards.find({roomNumber: this.roomId},{sort: {createdAt: -1}}).fetch());
	//will handle the events of the page
	Template.room.events({
		"click #submit-button": function(event){
				Cards.insert({
					roomNumber: roomId,
					text: $('.thoughts').val(),
					category: $('input:checkbox').val(),
					createdAt: new Date()
				});
			}
	});
}
if(Meteor.isServer){
}

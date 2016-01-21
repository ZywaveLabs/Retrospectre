"use strict";
/**
*@author TreJon House
*@date 1/14/16
*@version 1.0
*@edited 1/18/16
*@purpose find last room added to server and route to desired room if available
**/

if(Meteor.isClient)
{
	
	Template.landingPage.events({
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
	
}




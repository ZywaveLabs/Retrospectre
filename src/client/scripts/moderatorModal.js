/* global Popup: false Rooms: false */

Template.moderatorModal.helpers({
    cardsHidden: function(){
        var room = Rooms.findOne({"roomCode": Session.get("roomCode")});
        return !room.reveal;
    },

    categories: function() {
        return Rooms.findOne(
            {"roomCode": Session.get("roomCode")}
        ).categories;
    }
});


Template.moderatorModal.events({
    "click #revealCardButton": function(){
        Meteor.call("revealCards", Session.get("roomCode"));
    },

    "click #hideCardButton": function(){
        Meteor.call("hideCards", Session.get("roomCode"));
    },

    "click #clearRoomButton": function(){
        var roomCode = Session.get("roomCode"); // Get some closure in here
        Popup.Confirm("Delete all cards in room", function(){
            Meteor.call("deleteAllCardsInRoom", roomCode);
        });
    },

    "click #deleteRoomButton": function(){
        var roomCode = Session.get("roomCode");
        Popup.Confirm("Delete this room - " + roomCode, function(error, result){
            if(!error) {
                Router.go("/");
                Meteor.call("deleteSharedTextForRoom", roomCode, function(err, res){
                    if(!err) {
                        Meteor.call("deleteRoom", roomCode);
                    }
                });
            }
        });
    }
});

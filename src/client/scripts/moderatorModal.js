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
    },

    getTracker: function() {
        return new Tracker.Dependency();
    },

    onCategoryCreated: function() {
        return function(currentCategories, categoryName, color) {
            console.log(categoryName);
            console.log(color);
            Meteor.call("addCategoryToRoom", categoryName, Session.get("roomCode"), color);
            return true;
        };
    },
    onCategoryRemoved: function() {
        return function(currentCategories, categoryName, allowUpdate) {
            console.log(categoryName);
            Popup.Confirm("Delete this category - " + categoryName, function(){
                Meteor.call("deleteCategoryFromRoom", categoryName, Session.get("roomCode"));
                allowUpdate(true);
            }, function(){
                allowUpdate(false);
            });
        };
    },
    onColorChanged: function() {
        return function(currentCategories, categoryName, newColor){
            console.log(categoryName);
            Meteor.call("updateCategoryColor", categoryName, Session.get("roomCode"), newColor);
            return true;
        };
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
        Popup.Confirm("Delete this room - " + roomCode, function(){
            Router.go("/");
            Meteor.call("deleteSharedTextForRoom", roomCode, function(){
                Meteor.call("deleteRoom", roomCode);
            });
        });
    }
});

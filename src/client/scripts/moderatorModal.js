/* global Popup: false Rooms: false */

Template.moderatorModal.helpers({
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
            Meteor.call("addCategoryToRoom", categoryName, Session.get("roomCode"), color);
            return true;
        };
    },
    onCategoryRemoved: function() {
        return function(currentCategories, categoryName, allowUpdate) {
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
            Meteor.call("updateCategoryColor", categoryName, Session.get("roomCode"), newColor);
            return true;
        };
    }
});


Template.moderatorModal.events({

});

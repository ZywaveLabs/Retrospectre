/* global RoomMethods: true CardMethods */

Meteor.methods({ // eslint-disable-line
    createRoom: function (roomObject) {
        return RoomMethods.CreateRoom(roomObject);
    },
    getKeynoteID : function(roomCode){
        return RoomMethods.findKeynoteID(roomCode);
    },
    revealCards: function(roomCode) {
        var isModerator = RoomMethods.IsModerator(roomCode, Meteor.userId());
        if(!isModerator)
            return;
        RoomMethods.RevealCards(roomCode);
    },
    hideCards: function(roomCode) {
        var isModerator = RoomMethods.IsModerator(roomCode, Meteor.userId());
        if(!isModerator)
            return;
        RoomMethods.HideCards(roomCode);
    },
    deleteRoom: function(roomCode) {
        var isModerator = RoomMethods.IsModerator(roomCode, Meteor.userId());
        if(!isModerator)
            return;
        CardMethods.DeleteAllCardsInRoom(roomCode);
        RoomMethods.DeleteRoomByRoomcode(roomCode);
    },
    deleteCategoryFromRoom: function(category, roomCode){
        var isModerator = RoomMethods.IsModerator(roomCode, Meteor.userId());
        if(!isModerator)
            return;
        RoomMethods.DeleteCategoryFromRoom(category, roomCode);
    },
    addCategoryToRoom: function(category, roomCode, color){
        var isModerator = RoomMethods.IsModerator(roomCode, Meteor.userId());
        if(!isModerator)
            return;
        RoomMethods.AddCategoryToRoom(category, roomCode, color);
    },
    updateCategoryColor: function(category, roomCode, newColor){
        var isModerator = RoomMethods.IsModerator(roomCode, Meteor.userId());
        if(!isModerator)
            return;
        RoomMethods.UpdateCategoryColor(category, roomCode, newColor);
    }
});

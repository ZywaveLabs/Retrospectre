/* global RoomMethods: true CardMethods */

Meteor.methods({ // eslint-disable-line
    createRoom: function (roomObject) {
        return RoomMethods.CreateRoom(roomObject);
    },
    getKeynoteID : function(roomCode){
        return RoomMethods.findKeynoteID(roomCode);
    },
    revealCards: function(roomCode) {
        RoomMethods.RevealCards(roomCode);
    },
    hideCards: function(roomCode) {
        RoomMethods.HideCards(roomCode);
    },
    deleteRoom: function(roomCode) {
        CardMethods.DeleteAllCardsInRoom(roomCode);
        RoomMethods.DeleteRoomByRoomcode(roomCode);
    },
    deleteCategoryFromRoom: function(category, roomCode){
        RoomMethods.DeleteCategoryFromRoom(category, roomCode);
    },
    addCategoryToRoom: function(category, roomCode, color){
        RoomMethods.AddCategoryToRoom(category, roomCode, color);
    },
    updateCategoryColor: function(category, roomCode, newColor){
        RoomMethods.UpdateCategoryColor(category, roomCode, newColor);
    }
});

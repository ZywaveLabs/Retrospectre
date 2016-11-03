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

    isRoomModerated: function(roomCode) {
        return RoomMethods.isRoomModerated(roomCode);
    }
});

if(Meteor.isServer) {
    Meteor.methods({
        isModerator: function(roomCode) {
            return RoomMethods.IsModerator(roomCode, this.connection.id);
        },

        claimModerator: function(roomCode) {
            return RoomMethods.ClaimModerator(roomCode, this.connection.id);
        },

        resetModerator: function(roomCode) {
            var moderatorId = this.connection.id;
            if(RoomMethods.IsModerator(roomCode, moderatorId)) {
                RoomMethods.ResetModerator(roomCode);
           }
        },

        resetModeratorOnResetConnection: function(roomCode, moderatorId) {
            if(RoomMethods.IsModerator(roomCode, moderatorId)) {
                RoomMethods.ResetModerator(roomCode);
           }
        }
    });
}

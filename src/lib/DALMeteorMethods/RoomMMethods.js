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
    // isModerator: function(roomCode) {
    //     console.log("ELLO MATEY");
    //     console.log(this);
    //     return RoomMethods.IsModerator(roomCode, this.connection.id);
        
    // },
    resetModerator: function(roomCode) {
        if(isModerator) {
            RoomMethods.ResetModerator();
        }
    }

});

if(Meteor.isServer) {
    Meteor.methods({
    isModerator: function(roomCode) {
        console.log("ELLO MATEY");
        console.log(this);
        return RoomMethods.IsModerator(roomCode, this.connection.id);
        
    }
    });
}

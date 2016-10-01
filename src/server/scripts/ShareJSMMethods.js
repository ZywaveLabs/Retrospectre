/* global ShareJS RoomMethods */

Meteor.methods({ // eslint-disable-line
    getSharedTextForRoom: function (roomCode) {
        return ShareJS.model.getSnapshot(RoomMethods.getKeynoteID(roomCode), function(err, o){
            return o.snapshot;
        });
    },

    deleteSharedTextForRoom: function (roomCode){
        ShareJS.model.delete(RoomMethods.getKeynoteID(roomCode));
    }
});

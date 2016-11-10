/*eslint-disable*/
Users = new Mongo.Collection.get("users");
if (Meteor.isServer) {
    Meteor.publish("users", function() {
        return Users.find({
            _id: this.userId
        });
    });
    Meteor.publish("usersInRoom", function(roomCode) {
        return Users.find({
            "roomCodes": {
                $in: [roomCode]
            }
        }, {
            fields: {
                profile: 1
            }
        });
    });
} else {
    Meteor.subscribe("users");
}
UserMethods = {};

UserMethods.getUserImage = function(user) {
    var userImage = Users.findOne({
        _id: user
    }).services.google.picture;
    return userImage;
};

UserMethods.getAuthor = function() {
    return Meteor.user() ? Meteor.user().profile.name : Session.get("author");
};

UserMethods.getUsersInRoom = function(roomCode) {
    return Users.find({
        "roomCodes": {
            $in: [roomCode]
        }
    });
};

UserMethods.addUserToRoom = function(author, roomCode) {
    if (Meteor.user()) {
        var user = Users.findOne({
            _id: Meteor.userId()
        });
        var roomCodes = user.roomCodes;
        if (roomCodes === undefined)
            roomCodes = [roomCode];
        else if (roomCodes.indexOf(roomCode) === -1) {
            roomCodes.push(roomCode);
        }
        Users.update({
            _id: Meteor.userId()
        }, {
            $set: {
                roomCodes: roomCodes
            }
        });
    } else {
        if (author !== null && author !== undefined) {
            return Users.insert({
                "roomCodes": [roomCode],
                "profile": {
                    name: author
                }
            });
        }
    }
};

UserMethods.removeUserFromRoom = function(id, roomCode) {
    var user = Users.findOne({
        _id: id
    });
    if(user === undefined || user === null)
      return;
    if (user.services===undefined || user.services===null) {
        Users.remove({
            _id: id
        });
        return;
    }
    var roomCodes = user.roomCodes;
    if (roomCodes === undefined || roomCodes.length === 0)
        return;
    var index = roomCodes.indexOf(roomCode);
    if (index > -1)
        roomCodes.splice(index, 1);
    else if (index === -1)
        return;
    Users.update({
        _id: id
    }, {
        $set: {
            roomCodes: roomCodes
        }
    });
};

UserMethods.changeAlias = function(aliasID, newAlias) {
    Users.update({
        $or: [{
            _id: aliasID
        }, {
            sessionID: Meteor.connection._lastSessionId
        }]
    }, {
        $set: {
            profile: {
                name: newAlias
            }
        }
    });
};

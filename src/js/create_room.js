/* globals Rooms:false RoomMethods:false*/
"use strict";

if (Meteor.isClient) {

    Template.createRoom.onCreated(function() {
        this.subscribe("rooms");
        Meteor.call("generateNewRoomCode", function(error, result) {
            if (!error) {
                Session.set("roomCodeAvailable", true);
                Session.set("newRoomCode", result);
            } else {
                console.log(error); // eslint-disable-line
            }
        });
    });

    Template.createRoom.helpers({

        getNewRoomNumber: function() {
            return Session.get("newRoomCode");
        },

        roomNotAvailableShow: function() {
            return (Session.get("roomCodeAvailable") ? "none" : "");
        },

        createRoomDisable: function() {
            return (Session.get("roomCodeAvailable") ? "" : "disabled");
        }
    });

    Template.createRoom.events({

        "click #generateNewRoomCodeButton": function() {
            Session.set("newRoomCode", Meteor.call("generateNewRoomCode",
                function(error, result) {
                    if (!error) {
                        Session.set("newRoomCode", result);
                        Session.set("roomCodeAvailable", true);
                    } else {
                        /* Error state */
                    }
                }
            ));
        },

        "submit .create-room": function(eve) {
            eve.preventDefault();
            var roomId = eve.target.roomcode.value;

            if (roomId === null || roomId === "") {
                return; /* Error state */
            }

            Meteor.call("addRoom", roomId, function(){
                Session.set("roomNumber", roomId);
                Router.go("/room/" + roomId);
            });
        },

        "keyup #newRoomCode input": function(eve) {
            var newRoomCode = eve.target.value;
            var show = !Meteor.call("roomExists", newRoomCode);

            Session.set("roomCodeAvailable", show);
            Session.set("newRoomCode", eve.target.value);
        }
    });
}

if (Meteor.isServer) {
    var roomGen = JSON.parse(Assets.getText("room_gen.json"));

    Meteor.publish("rooms", function() {
        return Rooms.find({}, {
            sort: {
                id: -1
            }
        });
    });

    /**
     * generateNewRoomCode - Generates a new fun room code
     *
     * @return {string}  Fun Room code
     */
    var generateNewRoomCode = function() {
        var roomCode = "";

        while (roomCode === "" || RoomMethods.RoomExists(roomCode)) {
            var noun = roomGen.Nouns[getRandomInt(0, roomGen.Nouns.length)];
            var adjective = roomGen
                .Adjectives[getRandomInt(0, roomGen.Adjectives.length)];
            var verb = roomGen.Verbs[getRandomInt(0, roomGen.Verbs.length)];

            roomCode = adjective + verb + noun;
        }
        return roomCode;
    };


    /**
     *Adding meteor methods give methods we can
     *call using meteor.call this mandatory
     *when trying to handle the DB in any manner
     *it revokes DB access to the client
     *this is due to removing the insecure package
     **/
    Meteor.methods({
        roomExists: function(roomID) {
            return RoomMethods.RoomExists(roomID);
        },

        addRoom: function(newRoomID) {
            setTimeout(function(){}, 10000);
            RoomMethods.CreateRoom(newRoomID);
        },

        generateNewRoomCode: function() {
            return generateNewRoomCode();
        }
    });
}

/**
 * getRandomInt - Returns a random integer between min (included) and max (excluded)
 *  Using Math.round() will give you a non-uniform distribution!
 *
 * @param  {integer} min Minimum integer (Included)
 * @param  {integer} max Maximum integer (Excluded)
 * @return {integer}     description
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

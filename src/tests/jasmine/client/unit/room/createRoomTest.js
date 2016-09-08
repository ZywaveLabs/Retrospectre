/* globals Rooms:false */
"use strict";

describe("submit .create-room", function() {
    it("should create a room normally if roomId given is not null\
        or empty", function() {
        // setup
        var expectedId = "myId";
        var mockEvent = {
            event: {
                preventDefault: function(){},
                target:{roomcode:{value:expectedId}}
            }
        };

        spyOn(Meteor, "call");

        Template.createRoom.fireEvent("submit .create-room", mockEvent);

        expect(Meteor.call).toHaveBeenCalledWith("createRoom", expectedId,
            jasmine.any(Function));
    });

    it("cannot create a room when the room code is null", function() {
        var expectedId = null;
        var mockEvent = {
            event: {
                preventDefault: function(){},
                target:{roomcode:{value:expectedId}}
            }
        };

        spyOn(Meteor, "call");

        Template.createRoom.fireEvent("submit .create-room", mockEvent);

        expect(Meteor.call).not.toHaveBeenCalled();
    });

    it("cannot create a room without a name", function() {
        var expectedId = "";
        var mockEvent = {
            event: {
                preventDefault: function(){},
                target:{roomcode:{value:expectedId}}
            }
        };

        spyOn(Meteor, "call");

        Template.createRoom.fireEvent("submit .create-room", mockEvent);

        expect(Meteor.call).not.toHaveBeenCalled();
    });
});

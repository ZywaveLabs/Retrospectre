/* globals Rooms:false Cards:false */
"use strict";

xdescribe("creating a room", function() {
    it("can create a room when the room code does not exist", function() {
        // Setup
        var expectedId = "myId"
        event = jasmine.createSpyObj("event", ["preventDefault", "target"]);
        event = {
            target: {
                roomcode: {value: expectedId}
            },
            preventDefault: function() {}
        };

        // spyOn(Meteor, "call").and.callThrough();
        spyOn(Meteor, "call");
        spyOn(Rooms, "find").and.returnValue({expectedId});
        spyOn(Session, "get").and.returnValue("testRoom");

        // Execute
        Template.createRoom.fireEvent("submit .create-room");

        // Verify
        expect(Meteor.call).toHaveBeenCalledWith("addRoom", expectedId);
        expect(Rooms.find).toHaveBeenCalledWith({"id": expectedId});
    });

    xit("cannot create a room when the room code exists", function() {

    });

    xit("cannot create a room without a name", function() {

    });

    xit("generate a new room code which is valid", function() {

    });
});

"use strict";
/* global Cards: false*/
describe("reveal cards", function() {

    describe("reveal button", function() {

        it("should change all cards to revealed", function() {
            // Setup
            spyOn(Meteor, "call").and.callThrough();
            spyOn(Cards, "update");
            spyOn(Session, "get").and.returnValue("testRoom");

            // Execute
            Template.room.fireEvent("click #revealCardButton");

            // Verify
            expect(Meteor.call).toHaveBeenCalledWith("revealCards", "testRoom");
            expect(Cards.update).toHaveBeenCalledWith({"roomCode": "testRoom"},
              {$set: {reveal:true}}, {multi: true});

        });

    });

});

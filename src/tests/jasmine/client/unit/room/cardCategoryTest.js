"use strict";

describe("card category", function() {

    describe("good category", function() {

        it("should retrieve the cards from the good category", function() {
            // Setup
            spyOn(Cards, "find");
            spyOn(Session, "get").and.returnValues("testAuthor", "testRoom");

            // Execute
            Template.room.__helpers[" goodCards"]();

            // Verify
            expect(Session.get).toHaveBeenCalledWith("author");
            expect(Session.get).toHaveBeenCalledWith("roomNumber");
             expect(Cards.find).toHaveBeenCalledWith({"roomCode": "testRoom",
                "category": "good",
                $or: [{"reveal": true}, {"author": "testAuthor"}]});

        });

    });

    describe("bad category", function() {

        it("should retrieve the cards from the bad category", function() {
            // Setup
            spyOn(Cards, "find");
            spyOn(Session, "get").and.returnValues("testAuthor", "testRoom");

            // Execute
            Template.room.__helpers[" badCards"]();

            // Verify
            expect(Session.get).toHaveBeenCalledWith("author");
            expect(Session.get).toHaveBeenCalledWith("roomNumber");
            expect(Cards.find).toHaveBeenCalledWith({"roomCode": "testRoom",
                "category": "bad",
                $or: [{"reveal": true}, {"author": "testAuthor"}]});

        });

    });
});

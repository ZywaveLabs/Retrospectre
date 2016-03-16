"use strict";
/* global Cards: false*/
describe("export room", function() {

    describe("room export button", function() {

        it("should redirect to export page", function() {
            // Setup
            spyOn(Router, "go");
            spyOn(Session, "get").and.returnValue("testRoom");

            // Execute
            Template.room.fireEvent("click #exportButton");

            // Verify
            expect(Router.go).toHaveBeenCalledWith("/room/testRoom/export");
        });
    });

    describe("export template helpers", function() {

        describe("get categories", function() {
            it("should get the categories for the room described in the url", function() {
                // Setup
                var testRoom = {
                    categories: ["testCategoryOne", "testCategoryTwo"]
                };

                spyOn(Session, "get").and.returnValue("testRoom");
                spyOn(Rooms, "findOne").and.returnValue(testRoom);

                // Execute
                var returnedCategories = Template.exportRoom.__helpers[" getCategories"]();

                // Verify
                expect(Rooms.findOne).toHaveBeenCalledWith({"roomCode":"testRoom"});
                expect(returnedCategories).toContain("testCategoryOne");
                expect(returnedCategories).toContain("testCategoryTwo")

            });
        });

        describe("get cards", function() {
            it("should get the cards for the categories and the room", function() {
                // Setup
                spyOn(Session, "get").and.returnValue("testRoom");
                spyOn(Meteor, "apply");

                // Execute
                Template.exportRoom.__helpers[" getCards"]("testCategory");

                // Verify
                expect(Session.get).toHaveBeenCalled();
                expect(Meteor.apply).toHaveBeenCalledWith("getCardCollectionByQuery",
                    [{
                        "roomCode": "testRoom",
                        "category": "testCategory"
                 }], { returnStubValue: true });
            });
        });
    });
});


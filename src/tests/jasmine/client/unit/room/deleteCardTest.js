"use strict";

describe("deleteCard", function() {

    it("should delete the card", function() {
        // Setup
        spyOn(Meteor, "call").and.callThrough();
        spyOn(Cards, "remove");
        var dataContext = {
            context: {
                _id: "testID"
            }
        };

        // Execute
        Template.room.fireEvent("click #deleteCardButton", dataContext);

        // Verify
        expect(Meteor.call).toHaveBeenCalledWith("deleteCard", "testID");
        expect(Cards.remove).toHaveBeenCalledWith("testID");

    });

});

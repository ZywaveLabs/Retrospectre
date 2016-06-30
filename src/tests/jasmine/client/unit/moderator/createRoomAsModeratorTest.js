/*eslint-disable*/
/*
*Test Suite that shall
*test the functionality
*of a moderator
*/
describe("tests that only a moderator can create a room", function () {

  beforeEach(function () {
    spyOn(SnackbarMethods,"DisplayMessage");
  });

  it("shall warn user to login before creating a room", function () {
    spyOn(Meteor, "user").and.returnValue(null);
    Template.landingPage.fireEvent("click #createRoomButton");
    expect(SnackbarMethods.DisplayMessage).toHaveBeenCalledWith("Warning: Log" +
        " in via Google before creating room",3000);
  });

  it("should prevent room creation if user is not logged in", function () {
    spyOn(Meteor, "user").and.returnValue(null);
    var eve = {
      event:{
        preventDefault: function(){}
      }
    };
    Template.createRoom.fireEvent("submit .create-room, click #createAndJoinRoomButton",eve);
    expect(SnackbarMethods.DisplayMessage).toHaveBeenCalledWith("Only a moderator " +
          "can create a room.", 3000);
    expect(SnackbarMethods.DisplayMessage).toHaveBeenCalledWith("Please sign-in using a Google" +
          " account to become a moderator", 3000);
  });
});

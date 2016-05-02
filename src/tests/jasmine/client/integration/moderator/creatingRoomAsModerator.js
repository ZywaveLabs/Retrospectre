/*eslint-disable*/
xdescribe("create room as moderator", function () {

  describe("user is signed in", function () {

    beforeEach(function (done) {
        spyOn(Meteor, "user").and.returnValue("Test User");
        done();
    });

    beforeEach(function (done) {
      Router.go("Create Room");
      Tracker.afterFlush(function(){
        done();
      });
    });

    beforeEach(waitForRouter);

    afterEach(function(done){
      done();
    });

    it("should allow user to create a room", function () {
      expect(Meteor.user()).not.toBeNull();
      waitForElement("#createAndJoinRoomButton",function(){
        var eve = {
          event:{
            preventDefault: function(){}
          }
        };
        Template.createRoom.fireEvent("click #createAndJoinRoomButton",eve);
        expect(Meteor.call).toHaveBeenCalledWith("createRoom");
      });
    });

  });

  describe("user is not signed in", function () {

    beforeEach(function (done) {
        spyOn(Meteor, "user").and.returnValue(null);
        spyOn(SnackbarMethods, "DisplayMessage");
        done();
    });

    beforeEach(function (done) {
      Router.go("/");
      Tracker.afterFlush(function(){
        done();
      });
    });

    beforeEach(waitForRouter);

    afterEach(function(done){
      done();
    });

    it("should block user from creating a room", function () {
      expect(Meteor.user()).toBeNull();
      Template.landingPage.fireEvent("click #createRoomButton");
      expect(SnackbarMethods.DisplayMessage).toHaveBeenCalledWith("Warning: Log" +
          " in via Google before creating room",3000);
      waitForRouter;
      waitForElement("#createAndJoinRoomButton",function(){
        var eve = {
          event:{
            preventDefault: function(){}
          }
        };
        Template.createRoom.fireEvent("click #createAndJoinRoomButton",eve);
        expect(SnackbarMethods.DisplayMessage).toHaveBeenCalledWith("Only a moderator " +
              "can create a room.", 3000);
        expect(SnackbarMethods.DisplayMessage).toHaveBeenCalledWith("Please sign-in using a Google" +
              " account to become a moderator", 3000);
      });
    });

  });
});

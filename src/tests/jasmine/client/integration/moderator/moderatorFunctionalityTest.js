/*eslint-disable*/
describe("test functionality only a moderator has", function () {

  describe("user is signed in and is moderator", function () {

    beforeEach(function (done) {
        spyOn(Meteor, "user").and.returnValue("Test User");
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

    it("moderator shall be able to reveal all cards in the room", function () {
      spyOn(Session, "get").and.returnValue("testRoom");
      expect(Meteor.user()).not.toBeNull();
      Template.landingPage.fireEvent("click #createRoomButton");
      waitForRouter;
      waitForElement("#createAndJoinRoomButton",function(){
        var eve = {
          event:{
            preventDefault: function(){}
          }
        };
        Template.createRoom.fireEvent("click #createAndJoinRoomButton",eve);
        expect(Meteor.call).toHaveBeenCalledWith("createRoom");
      });
      waitForRouter;
      waitForElement("#revealCardButton",function(){
          Template.room.fireEvent("click #revealCardButton");
          expect(Meteor.call).toHaveBeenCalledWith("revealCards","testRoom");
      });
    });

  });

  describe("user is not signed in, so cannot use moderator features", function () {
    beforeEach(function (done) {
        spyOn(Meteor, "user").and.returnValue(null);
        done();
    });

    beforeEach(function (done) {
      Router.go("/room/testRoom");
      Tracker.afterFlush(function(){
        done();
      });
    });

    beforeEach(waitForRouter);

    afterEach(function(done){
      done();
    });

    it("user cannot reveal all cards", function () {
      waitForElement("form#card",function(){
        expect($("#revealCardButton")).toEqual([]);
      });
    });
  });

});

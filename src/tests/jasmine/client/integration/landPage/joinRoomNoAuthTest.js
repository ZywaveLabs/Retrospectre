/*eslint-disable*/
describe("verify user can join room with no auth", function(){

  beforeEach(function (done) {
    spyOn(Router,"go");
    Router.go('/');
    Tracker.afterFlush(done);
    done();
  });

  afterEach(function(done) {
    done();
  });

  it("should navigate from the landing page, to create-room,then join created room", function () {
    expect(document.title == "Retrospectre - Home").toBe(true);
    Template.landingPage.fireEvent("click #createRoomButton");
    expect(Router.go).toHaveBeenCalledWith("Create Room");
    waitForElement("h3",function(){
      expect(document.title == "Retrospectre - Create Room").toBe(true);
      var roomNum = $("h3").html();
      roomNum = roomNum.substring(roomNum.indexOf(":")+2);
      Template.createRoom.fireEvent("click #createAndJoinRoomButton");
      expect(Router.go).toHaveBeenCalledWith("/room/"+roomNum);
      expect(document.title == "Retrospectre - The Poltergeists").toBe(true);
      expect(window.location.pathname == ("/room/"+roomNum)).toBe(true);
    });

  });

  it("should navigate from the landing page, joined room", function () {
    expect(document.title == "Retrospectre - Home").toBe(true);
    eve = {
      target:{
        roomCode:{value: 1}
      },
      preventDefault: function(){}
    };
    Template.landingPage.fireEvent("submit .join-room",{event:eve});
    expect(Router.go).toHaveBeenCalledWith("/room/1");
    waitForElement("h1",function(){
      $("#roomCode").val("1");
      Template.landingPage.fireEvent("submit .join-room");
      expect(Router.go).toHaveBeenCalledWith("/room/1");
      expect(document.title == "Retrospectre - The Poltergeists").toBe(true);
      expect(window.location.pathname == ("/room/1")).toBe(true);
    });

  });

});

function waitForElement(selector, successCallback) {
  var checkInterval = 50;
  var timeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  var startTime = Date.now();
  var intervalId = Meteor.setInterval(function () {
    if (Date.now() > startTime + timeoutInterval) {
      Meteor.clearInterval(intervalId);
      // Jasmine will handle the test timeout error
    } else if ($(selector).length > 0) {
      Meteor.clearInterval(intervalId);
      successCallback();
    }
  }, checkInterval);
}

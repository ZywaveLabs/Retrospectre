/*eslint-disable*/
describe("tests to run against the landing page and iron router",function(){

  beforeEach(function (done) {
    spyOn(Router,"go");
    Router.go('/');
    Tracker.afterFlush(done);
    done();
  });

  // beforeEach(waitForRouter);

  afterEach(function(done){
    done();
  });

  it("should navigate from landing page to create-room",function(){
    var callBack = function(){
            expect(document.title == "Retrospectre - Home").toBe(true);
          };
    waitForElement("h1",callBack);
    Template.landingPage.fireEvent("click #createRoomButton");
    expect(Router.go).toHaveBeenCalledWith("Create Room");
    callBack = function(){
            expect(document.title == "Retrospectre - Create Room").toBe(true);
            expect($("h1").innerHTML()).toEqual("Create A Room");
          };
    waitForElement("h1",callBack);
    // // waitForRouter();
    // expect(document.title == "Retrospectre - Create Room").toBe(true);
    // expect($("h1").innerHTML()).toEqual("Create A Room");
    // done();

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

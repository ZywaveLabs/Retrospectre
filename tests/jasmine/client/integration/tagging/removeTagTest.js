/*eslint-disable*/
describe("remove tags from cards", function () {

  beforeEach(function (done) {
    spyOn(Router,"go");
    spyOn(Meteor,"call").and.callThrough();
    Router.go('/room/testRoom');
    Tracker.afterFlush(done);
    done();
  });

  afterEach(function(done){
    done();
  });

  it("should remove tag from a card", function () {

    event = jasmine.createSpyObj("event", ["target", "preventDefault"]);
    event = {
      target: {
        thoughts: {value: "testThought"},
        tags: {value: "testTag"},
        author: {value: "testAuthor"},
        goodCategoryRadio: {checked: true},
        badCategoryRadio: {checked: false}
      },
      preventDefault: function() {}
    };
    var baseTime = new Date();
    jasmine.clock().mockDate(baseTime);
    spyOn(Session, "get").and.returnValue("testRoom");
    spyOn(Session, "set");
    Template.card.fireEvent("submit #card");
        var callBack = function(){
        removeTagEvent = jasmine.createSpyObj("e",["target","toElement"]);
        removeTagEvent = {
          target : {previousElementSibling: "<tag class='tag'>testTag</tag>"},
          toElement:{
            parentNode : {parentNode: "<div class='card-action'><div class='chip'><i id='deleteCardButton' class='material-icons fa fa-trash-o'></i>Remove Card</div><div class='chip'><tag class='tag'>testTag</tag><i id='removeTag' class='material-icons fa fa-ban'></i></div></div>"},
            parentNode : {parentNode :{previousElementSibling: "<span class='white-text'>testThought</span>"}}
          }
        };
        Meteor.call.calls.reset();
        Template.room.fireEvent("click #removeTag",{event:removeTagEvent});
        expect(Meteor.call).toHaveBeenCalledWith("removeTag","testThought",["testTag"],[]);
    };
    waitForElement("tag",callBack);
  });

  it("should remove tag from a card with multiple tags", function () {

    event = jasmine.createSpyObj("event", ["target", "preventDefault"]);
    event = {
      target: {
        thoughts: {value: "testThought"},
        tags: {value: "testTag,second tag"},
        author: {value: "testAuthor"},
        goodCategoryRadio: {checked: true},
        badCategoryRadio: {checked: false}
      },
      preventDefault: function() {}
    };
    var baseTime = new Date();
    jasmine.clock().mockDate(baseTime);
    spyOn(Session, "get").and.returnValue("testRoom");
    spyOn(Session, "set");
    Template.card.fireEvent("submit #card");
        var callBack = function(){
        removeTagEvent = jasmine.createSpyObj("e",["target","toElement"]);
        removeTagEvent = {
          target : {previousElementSibling: "<tag class='tag'>testTag</tag>"},
          toElement:{
            parentNode : {parentNode: "<div class='card-action'><div class='chip'><i id='deleteCardButton' class='material-icons fa fa-trash-o'></i>Remove Card</div><div class='chip'><tag class='tag'>second tag</tag><i id='removeTag' class='material-icons fa fa-ban'></i></div></div>"},
            parentNode : {parentNode :{previousElementSibling: "<span class='white-text'>testThought</span>"}}
          }
        };
        Template.room.fireEvent("click #removeTag",{event:removeTagEvent});
        expect(Meteor.call).toHaveBeenCalledWith("removeTag","testThought",["testTag","second tag"],["seond tag"]);
    };
    waitForElement("tag",callBack);
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

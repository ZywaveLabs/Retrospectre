/*eslint-disable*/
describe("filter cards based on tags", function () {

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

  it("should display one card since only one has the same filtering tag, clicking tag", function () {
      waitForElement("h1",function(){
        expect(document.title == "Retrospectre - The Poltergeists").toBe(true);
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
        baseTime = new Date();
        jasmine.clock().mockDate(baseTime);
        spyOn(Session, "get").and.returnValue("testRoom");
        spyOn(Session, "set");
        Template.card.fireEvent("submit #card");
        expect(Meteor.call.calls.count()).toEqual(2);
        filterEvent = jasmine.createSpyObj("e",["toElement"]);
        filterEvent = {
          toElement: {innerHTML:"<tag class='tag'>second tag</tag>"}
        };
        Template.room.fireEvent("click tag",{event:filterEvent});
        expect($(".card-panel").eq(1).is(":visible")).toBe(false);
        expect($(".card-panel").eq(0).is(":visible")).toBe(true);
        expect($("#filters").val()=="second tag").toBe(true);
    });
  });

  it("should display one card since only one has the same filtering tag, clicking form", function () {
      waitForElement("h1",function(){
        expect(document.title == "Retrospectre - The Poltergeists").toBe(true);
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
        baseTime = new Date();
        jasmine.clock().mockDate(baseTime);
        spyOn(Session, "get").and.returnValue("testRoom");
        spyOn(Session, "set");
        Template.card.fireEvent("submit #card");
        expect(Meteor.call.calls.count()).toEqual(2);
        filterEvent = jasmine.createSpyObj("e",["target"]);
        filterEvent = {
          target: {filters: {value: "second tag"}}
        };
        Template.room.fireEvent("click #filterTagsButton",{event:filterEvent});
        expect($(".card-panel").eq(1).is(":visible")).toBe(false);
        expect($(".card-panel").eq(0).is(":visible")).toBe(true);
    });
  });

  it("should display one card since only one has the same filtering tag, using submit form", function () {
      waitForElement("h1",function(){
        expect(document.title == "Retrospectre - The Poltergeists").toBe(true);
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
        baseTime = new Date();
        jasmine.clock().mockDate(baseTime);
        spyOn(Session, "get").and.returnValue("testRoom");
        spyOn(Session, "set");
        Template.card.fireEvent("submit #card");
        expect(Meteor.call.calls.count()).toEqual(2);
        filterEvent = jasmine.createSpyObj("e",["target","preventDefault"]);
        filterEvent = {
          target: {filters: {value: "second tag"}},
          preventDefault : function(){}
        };
        Template.room.fireEvent("submit #tagSearchForm",{event:filterEvent});
        expect($(".card-panel").eq(1).is(":visible")).toBe(false);
        expect($(".card-panel").eq(0).is(":visible")).toBe(true);
    });
  });

    it("should display both card since both share the same filtering tag, using submit form", function () {
        waitForElement("h1",function(){
          expect(document.title == "Retrospectre - The Poltergeists").toBe(true);
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
          baseTime = new Date();
          jasmine.clock().mockDate(baseTime);
          spyOn(Session, "get").and.returnValue("testRoom");
          spyOn(Session, "set");
          Template.card.fireEvent("submit #card");
          expect(Meteor.call.calls.count()).toEqual(2);
          filterEvent = jasmine.createSpyObj("e",["target","preventDefault"]);
          filterEvent = {
            target: {filters: {value: "testTag"}},
            preventDefault : function(){}
          };
          Template.room.fireEvent("submit #tagSearchForm",{event:filterEvent});
          expect($(".card-panel").eq(1).is(":visible")).toBe(true);
          expect($(".card-panel").eq(0).is(":visible")).toBe(true);
      });
  });

    it("should display no card since no card has this tag", function () {
        waitForElement("h1",function(){
          expect(document.title == "Retrospectre - The Poltergeists").toBe(true);
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
          baseTime = new Date();
          jasmine.clock().mockDate(baseTime);
          spyOn(Session, "get").and.returnValue("testRoom");
          spyOn(Session, "set");
          Template.card.fireEvent("submit #card");
          expect(Meteor.call.calls.count()).toEqual(2);
          filterEvent = jasmine.createSpyObj("e",["target","preventDefault"]);
          filterEvent = {
            target: {filters: {value: "not a valid tag"}},
            preventDefault : function(){}
          };
          Template.room.fireEvent("submit #tagSearchForm",{event:filterEvent});
          expect($(".card-panel").eq(1).is(":visible")).toBe(false);
          expect($(".card-panel").eq(0).is(":visible")).toBe(false);
      });
  });

  it("should display all cards since filters have been cleared", function () {
      waitForElement("h1",function(){
        expect(document.title == "Retrospectre - The Poltergeists").toBe(true);
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
        baseTime = new Date();
        jasmine.clock().mockDate(baseTime);
        spyOn(Session, "get").and.returnValue("testRoom");
        spyOn(Session, "set");
        Template.card.fireEvent("submit #card");
        expect(Meteor.call.calls.count()).toEqual(2);
        filterEvent = jasmine.createSpyObj("e",["target","preventDefault"]);
        filterEvent = {
          target: {filters: {value: "not a valid tag"}},
          preventDefault : function(){}
        };
        Template.room.fireEvent("submit #tagSearchForm",{event:filterEvent});
        expect($(".card-panel").eq(1).is(":visible")).toBe(false);
        expect($(".card-panel").eq(0).is(":visible")).toBe(false);
        Template.room.fireEvent("click clearFilter");
        expect($(".card-panel").eq(1).is(":visible")).toBe(true);
        expect($(".card-panel").eq(0).is(":visible")).toBe(true);
        expect($("#filters").val()=="").toBe(true);
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

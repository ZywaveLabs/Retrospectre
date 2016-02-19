/*eslint-disable*/
describe("add valid cards with tags",function(){

  beforeEach(function() {
    spyOn(Meteor, "call").and.callThrough();
    spyOn(Cards, "insert");
  });

  it("should add card with one tag",function(){
    event = jasmine.createSpyObj("event",["target","preventDefault"]);
    event = {
      target: {
        thoughts : {value: "testThought"},
        tags: {value: "testTag"},
        author: {value: "testAuthor"},
        goodCategoryRadio: {checked: true},
        badCategoryRadio: {checked: false}
      },
      preventDefault: function(){}
    };
    spyOn(Session, "get").and.returnValue("testRoom");
    spyOn(Session, "set");
    var baseTime = new Date();
    jasmine.clock().mockDate(baseTime);

    Template.card.fireEvent("submit #card");
    expect(Meteor.call).toHaveBeenCalledWith("submitCardWithTags", "testRoom",
              "good", "testThought",["testTag"], "testAuthor");
    expect(Cards.insert).toHaveBeenCalledWith({
          roomCode: "testRoom",
          category: "good",
          createdAt: baseTime,
          text: "testThought",
          tags: ["testTag"],
          author: "testAuthor",
          reveal: false
      });
    expect(Session.set).toHaveBeenCalledWith("author", "testAuthor");
    expect(event.target.thoughts.value).toEqual("");
    expect(event.target.tags.value).toEqual("");
  });

  it("should add card with multiple tags",function(){
    event = jasmine.createSpyObj("event",["target","preventDefault"]);
    event = {
      target: {
        thoughts : {value: "testThought"},
        tags: {value: "testTag,jasmine unit,testing"},
        author: {value: "testAuthor"},
        goodCategoryRadio: {checked: true},
        badCategoryRadio: {checked: false}
      },
      preventDefault: function(){}
    };
    spyOn(Session, "get").and.returnValue("testRoom");
    spyOn(Session, "set");
    var baseTime = new Date();
    jasmine.clock().mockDate(baseTime);

    Template.card.fireEvent("submit #card");
    expect(Meteor.call).toHaveBeenCalledWith("submitCardWithTags", "testRoom",
              "good", "testThought",["testTag","jasmine unit","testing"], "testAuthor");
    expect(Cards.insert).toHaveBeenCalledWith({
          roomCode: "testRoom",
          category: "good",
          createdAt: baseTime,
          text: "testThought",
          tags: ["testTag","jasmine unit","testing"],
          author: "testAuthor",
          reveal: false
      });
    expect(Session.set).toHaveBeenCalledWith("author", "testAuthor");
    expect(event.target.thoughts.value).toEqual("");
    expect(event.target.tags.value).toEqual("");
  });

  it("should add card with one tag, though given several of same tag",function(){
    event = jasmine.createSpyObj("event",["target","preventDefault"]);
    event = {
      target: {
        thoughts : {value: "testThought"},
        tags: {value: "testTag,testTag,testTag,testTag"},
        author: {value: "testAuthor"},
        goodCategoryRadio: {checked: true},
        badCategoryRadio: {checked: false}
      },
      preventDefault: function(){}
    };
    spyOn(Session, "get").and.returnValue("testRoom");
    spyOn(Session, "set");
    var baseTime = new Date();
    jasmine.clock().mockDate(baseTime);

    Template.card.fireEvent("submit #card");
    expect(Meteor.call).toHaveBeenCalledWith("submitCardWithTags", "testRoom",
              "good", "testThought",["testTag"], "testAuthor");
    expect(Cards.insert).toHaveBeenCalledWith({
          roomCode: "testRoom",
          category: "good",
          createdAt: baseTime,
          text: "testThought",
          tags: ["testTag"],
          author: "testAuthor",
          reveal: false
      });
    expect(Session.set).toHaveBeenCalledWith("author", "testAuthor");
    expect(event.target.thoughts.value).toEqual("");
    expect(event.target.tags.value).toEqual("");
  });
});

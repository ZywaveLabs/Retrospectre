/*eslint-disable*/
describe("remove tags from a card", function(){

  beforeEach(function() {
    spyOn(Meteor, "call").and.callThrough();
    spyOn(Cards, "insert");
    spyOn(Cards, "update");
  });

  it("should remove clicked tag and update card", function () {
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
    removeEvent = jasmine.createSpyObj("event",["target","toElement,find"]);
    removeEvent = {
      target: { previousElementSibling: "<tag class='tag'>testTag</tag>"},
      toElement: {
        value: "<i id='removeTag' class='material-icons fa fa-ban'></i>",
        parentNode: {parentNode:"<div class='card-action'><div class='chip'><i id='deleteCardButton' class='material-icons fa fa-trash-o'></i>Remove Card</div><div class='chip'><tag class='tag'>testTag</tag><i id='removeTag' class='material-icons fa fa-ban'></i></div></div>"},
        parentNode:{parentNode: {previousElementSibling: "<span class='white-text'>testThought</span>"}}
      }
    };
    Meteor.call.calls.reset();
    Template.room.fireEvent("click #removeTag",{event: removeEvent});
    spyOn($(removeEvent.toElement.parentNode.parentNode),"find").and.returnValue("<tag class='tag'>testTag</tag>");
    expect(Meteor.call).toHaveBeenCalledWith("removeTag", "testThought",
              ["testTag"], []);
    expect(Cards.update).toHaveBeenCalled();
  });
});

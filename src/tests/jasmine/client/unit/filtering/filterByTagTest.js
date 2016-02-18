/*eslint-disable*/
describe("filter cards by tags",function(){

  describe("filter cards by single tag",function(){

    beforeEach(function () {
      spyOn(Meteor, "call").and.callThrough();
      spyOn(Cards, "insert");
    });

    afterEach(function(){
      Cards.remove({roomCode:"testRoom"});
    });

    it("should filter all cards by single tag", function(){
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
      event = {
        target: {
          thoughts : {value: "testThought"},
          tags: {value: "different tag"},
          author: {value: "testAuthor"},
          goodCategoryRadio: {checked: true},
          badCategoryRadio: {checked: false}
        },
        preventDefault: function(){}
      };
      baseTime = new Date();
      jasmine.clock().mockDate(baseTime);

      Template.card.fireEvent("submit #card");
      tagEvent = jasmine.createSpyObj("event",["toElement.innerHTML"]);
      tagEvent = {
        toElement: { value: "<tag class='tag'>testTag</tag>"}
      };
      // $(".card-panel").eq(1).find("tag").click();
      // var card0 = $(".card-panel").eq(0).is(":visible");
      // var card1 = $(".card-panel").eq(1).is(":visible");
      Template.room.fireEvent("click tag", {event: tagEvent});
      expect($("div#card")[1]).toBeVisible();
      expect($("div#card")[0]).toBeHidden();
    });
  });
});

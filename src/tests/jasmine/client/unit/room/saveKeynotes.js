/*eslint-disable*/
describe("save notes to mongo db", function() {

  beforeEach(function() {
    spyOn(Meteor, "call");
  });

  it("should save notes when clicking save", function() {
    //setup
    var eventObj = {
      target: {
        previousElementSibling: {
          childNodes: {
            [2]: {
              childNodes: {
                [0]: {
                  childNodes: {
                    [2]: {
                      childNodes:{
                        length:1,
                        [0]:{innerText:"test notes"}
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    //execute
    spyOn(Session, "get").and.returnValue("testRoom");
    Template.room.fireEvent("click #keyNoteSaveButton", {event: eventObj});
    //verify
    expect(Meteor.call).toHaveBeenCalledWith("saveNotes", "test notes\n", "testRoom");
  });

  it("should save notes when hitting ctrl+s", function() {
    //setup
    var eventObj = {
      target: {
        parentNode: {
          childNodes: {
            [2]: {
              childNodes: {
                [0]: {
                  childNodes: {
                    [2]: {
                      childNodes:{
                        length:1,
                        [0]:{innerText:"test notes"}
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      preventDefault : function(){},
      ctrlKey : true,
      which : 83,
      keyCode : false
    };
    //execute
    spyOn(Session, "get").and.returnValue("testRoom");
    Template.room.fireEvent("keydown #editor", {event: eventObj});
    //verify
    expect(Meteor.call).toHaveBeenCalledWith("saveNotes", "test notes\n", "testRoom");
  });

});

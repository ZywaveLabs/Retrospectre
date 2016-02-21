<<<<<<< HEAD
/*eslint-disable*/
=======
"use strict";

>>>>>>> master
describe("createCard", function() {

    describe("invalid submits", function() {

<<<<<<< HEAD
    it("should not submit if the thought is empty", function() {
      //Setup
      event = jasmine.createSpyObj("event", ["target", "preventDefault"]);
      event = {
        target: {
          thoughts: {value: ""},
          tags: {value: ""},
          author: {value: "testAuthor"},
          goodCategoryRadio: {checked: true},
          badCategoryRadio: {checked: false}
        },
        preventDefault: function() {}
      };
=======
        it("should not submit if the thought is empty", function() {
            // Setup
            event = jasmine.createSpyObj("event", ["target", "preventDefault"]);
            event = {
                target: {
                    thoughts: {value: ""},
                    author: {value: "testAuthor"},
                    goodCategoryRadio: {checked: true},
                    badCategoryRadio: {checked: false}
                },
                preventDefault: function() {}
            };
>>>>>>> master

            spyOn(Session, "get").and.returnValue("testRoom");
            spyOn(Session, "set");
            spyOn(window, "alert");

            // Execute
            Template.card.fireEvent("submit #card");

            // Verify
            expect(window.alert).toHaveBeenCalledWith("Enter a thought");

        });

<<<<<<< HEAD
    it("should not submit if the author is empty", function() {
      //Setup
      event = jasmine.createSpyObj("event", ["target", "preventDefault"]);
      event = {
        target: {
          thoughts: {value: "testThought"},
          tags: {value: ""},
          author: {value: ""},
          goodCategoryRadio: {checked: true},
          badCategoryRadio: {checked: false}
        },
        preventDefault: function() {}
      };

      spyOn(Session, "get").and.returnValue("testRoom");
      spyOn(Session, "set");
      spyOn(window, "alert");

      //Execute
      Template.card.fireEvent("submit #card");

      //Verify
      expect(window.alert).toHaveBeenCalledWith("Who's thought is this?");
    });

    it("should not submit if a category is not selected", function() {
      //Setup
      event = jasmine.createSpyObj("event", ["target", "preventDefault"]);
      event = {
        target: {
          thoughts: {value: "testThought"},
          tags: {value: ""},
          author: {value: ""},
          goodCategoryRadio: {checked: false},
          badCategoryRadio: {checked: false}
        },
        preventDefault: function() {}
      };

      spyOn(Session, "get").and.returnValue("testRoom");
      spyOn(Session, "set");
      spyOn(window, "alert");

      //Execute
      Template.card.fireEvent("submit #card");

      //Verify
      expect(window.alert).toHaveBeenCalledWith("Enter a category for your thought");
    });
=======
        it("should not submit if the author is empty", function() {
            // Setup
            event = jasmine.createSpyObj("event", ["target", "preventDefault"]);
            event = {
                target: {
                    thoughts: {value: "testThought"},
                    author: {value: ""},
                    goodCategoryRadio: {checked: true},
                    badCategoryRadio: {checked: false}
                },
                preventDefault: function() {}
            };

            spyOn(Session, "get").and.returnValue("testRoom");
            spyOn(Session, "set");
            spyOn(window, "alert");

            // Execute
            Template.card.fireEvent("submit #card");

            // Verify
            expect(window.alert).toHaveBeenCalledWith("Who's thought is this?");
        });

        it("should not submit if a category is not selected", function() {
            // Setup
            event = jasmine.createSpyObj("event", ["target", "preventDefault"]);
            event = {
                target: {
                    thoughts: {value: "testThought"},
                    author: {value: ""},
                    goodCategoryRadio: {checked: false},
                    badCategoryRadio: {checked: false}
                },
                preventDefault: function() {}
            };

            spyOn(Session, "get").and.returnValue("testRoom");
            spyOn(Session, "set");
            spyOn(window, "alert");

            // Execute
            Template.card.fireEvent("submit #card");

            // Verify
            expect(window.alert).toHaveBeenCalledWith("Enter a category " +
                "for your thought");
        });
>>>>>>> master

    });

    describe("valid submits", function() {

        beforeEach(function() {
            spyOn(Meteor, "call").and.callThrough();
            spyOn(Cards, "insert");
        });

<<<<<<< HEAD
    it("should submit the card with good category", function() {
      //Setup
      event = jasmine.createSpyObj("event", ["target", "preventDefault"]);
      event = {
        target: {
          thoughts: {value: "testThought"},
          tags: {value: ""},
          author: {value: "testAuthor"},
          goodCategoryRadio: {checked: true},
          badCategoryRadio: {checked: false}
        },
        preventDefault: function() {}
      };

      spyOn(Session, "get").and.returnValue("testRoom");
      spyOn(Session, "set");
      var baseTime = new Date();
      jasmine.clock().mockDate(baseTime);

      //Execute
      Template.card.fireEvent("submit #card");

      //Verify
      expect(Meteor.call).toHaveBeenCalledWith("submitCard", "testRoom",
                "good", "testThought", "testAuthor");
      expect(Cards.insert).toHaveBeenCalledWith({
            roomCode: "testRoom",
            category: "good",
            createdAt: baseTime,
            text: "testThought",
            tags: [],
            author: "testAuthor",
            reveal: false
=======
        it("should submit the card with good category", function() {
            // Setup
            event = jasmine.createSpyObj("event", ["target", "preventDefault"]);
            event = {
                target: {
                    thoughts: {value: "testThought"},
                    author: {value: "testAuthor"},
                    goodCategoryRadio: {checked: true},
                    badCategoryRadio: {checked: false}
                },
                preventDefault: function() {}
            };
            var baseTime = new Date();

            spyOn(Session, "get").and.returnValue("testRoom");
            spyOn(Session, "set");
            jasmine.clock().mockDate(baseTime);

            // Execute
            Template.card.fireEvent("submit #card");

            // Verify
            expect(Meteor.call).toHaveBeenCalledWith("submitCard", "testRoom",
                "good", "testThought", "testAuthor", 0, "Like");
            expect(Cards.insert).toHaveBeenCalledWith({
                roomCode: "testRoom",
                category: "good",
                createdAt: baseTime,
                text: "testThought",
                likes: 0,
                likeBtn: "Like",
                author: "testAuthor",
                reveal: false
            });
            expect(Session.set).toHaveBeenCalledWith("author", "testAuthor");
            expect(event.target.thoughts.value).toEqual("");
>>>>>>> master
        });

<<<<<<< HEAD
    it("should submit the card with bad category", function() {
      //Setup
      event = jasmine.createSpyObj("event", ["target", "preventDefault"]);
      event = {
        target: {
          thoughts: {value: "testThought"},
          tags: {value: ""},
          author: {value: "testAuthor"},
          goodCategoryRadio: {checked: false},
          badCategoryRadio: {checked: true}
        },
        preventDefault: function() {}
      };

      spyOn(Session, "get").and.returnValue("testRoom");
      spyOn(Session, "set");
      var baseTime = new Date();
      jasmine.clock().mockDate(baseTime);

      //Execute
      Template.card.fireEvent("submit #card");

      //Verify
      expect(Meteor.call).toHaveBeenCalledWith("submitCard", "testRoom",
                "bad", "testThought", "testAuthor");
      expect(Cards.insert).toHaveBeenCalledWith({
            roomCode: "testRoom",
            category: "bad",
            createdAt: baseTime,
            text: "testThought",
            tags: [],
            author: "testAuthor",
            reveal: false
=======
        it("should submit the card with bad category", function() {
            // Setup
            event = jasmine.createSpyObj("event", ["target", "preventDefault"]);
            event = {
                target: {
                    thoughts: {value: "testThought"},
                    author: {value: "testAuthor"},
                    goodCategoryRadio: {checked: false},
                    badCategoryRadio: {checked: true}
                },
                preventDefault: function() {}
            };
            var baseTime = new Date();

            spyOn(Session, "get").and.returnValue("testRoom");
            spyOn(Session, "set");
            jasmine.clock().mockDate(baseTime);

            // Execute
            Template.card.fireEvent("submit #card");

            // Verify
            expect(Meteor.call).toHaveBeenCalledWith("submitCard", "testRoom",
                "bad", "testThought", "testAuthor", 0, "Like");
            expect(Cards.insert).toHaveBeenCalledWith({
                roomCode: "testRoom",
                category: "bad",
                createdAt: baseTime,
                text: "testThought",
                likes: 0,
                likeBtn: "Like",
                author: "testAuthor",
                reveal: false
            });
            expect(Session.set).toHaveBeenCalledWith("author", "testAuthor");
            expect(event.target.thoughts.value).toEqual("");
>>>>>>> master
        });

    });

});

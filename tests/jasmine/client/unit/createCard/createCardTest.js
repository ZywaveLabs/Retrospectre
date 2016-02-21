/*eslint-disable*/
describe("createCard", function() {

    describe("invalid submits", function() {
        it("should not submit if the thought is empty", function() {
            // Setup
            var eventObj = {
                event: {
                    target: {
                        thoughts: {
                            value: ""
                        },
                        tags: {
                            value: ""
                        },
                        author: {
                            value: "testAuthor"
                        },
                        goodCategoryRadio: {
                            checked: true
                        },
                        badCategoryRadio: {
                            checked: false
                        }
                    },
                    preventDefault: function() {}
                }
            };

            spyOn(Session, "get").and.returnValue("testRoom");
            spyOn(Session, "set");
            spyOn(window, "alert");

            // Execute
            Template.card.fireEvent("submit #card", eventObj);

            // Verify
            expect(window.alert).toHaveBeenCalledWith("Enter a thought");

        });

        it("should not submit if the author is empty", function() {
            //Setup
            var eventObj = {
                event: {
                    target: {
                        thoughts: {
                            value: "testThought"
                        },
                        tags: {
                            value: ""
                        },
                        author: {
                            value: ""
                        },
                        goodCategoryRadio: {
                            checked: true
                        },
                        badCategoryRadio: {
                            checked: false
                        }
                    },
                    preventDefault: function() {}
                }
            };

            spyOn(Session, "get").and.returnValue("testRoom");
            spyOn(Session, "set");
            spyOn(window, "alert");

            //Execute
            Template.card.fireEvent("submit #card", eventObj);

            //Verify
            expect(window.alert).toHaveBeenCalledWith("Who's thought is this?");
        });

        it("should not submit if a category is not selected", function() {
            //Setup
            var eventObj = {
                event: {
                    target: {
                        thoughts: {
                            value: "testThought"
                        },
                        tags: {
                            value: ""
                        },
                        author: {
                            value: ""
                        },
                        goodCategoryRadio: {
                            checked: false
                        },
                        badCategoryRadio: {
                            checked: false
                        }
                    },
                    preventDefault: function() {}
                }
            };

            spyOn(Session, "get").and.returnValue("testRoom");
            spyOn(Session, "set");
            spyOn(window, "alert");

            //Execute
            Template.card.fireEvent("submit #card", eventObj);

            //Verify
            expect(window.alert).toHaveBeenCalledWith("Enter a category for your thought");
        });
    });

    describe("valid submits", function() {

        beforeEach(function() {
            spyOn(Meteor, "call").and.callThrough();
            spyOn(Cards, "insert");
        });

        it("should submit the card with good category", function() {
            //Setup
            var eventObj = {
                event: {
                    target: {
                        thoughts: {
                            value: "testThought"
                        },
                        tags: {
                            value: ""
                        },
                        author: {
                            value: "testAuthor"
                        },
                        goodCategoryRadio: {
                            checked: true
                        },
                        badCategoryRadio: {
                            checked: false
                        }
                    },
                    preventDefault: function() {}
                }
            };

            spyOn(Session, "get").and.returnValue("testRoom");
            spyOn(Session, "set");
            var baseTime = new Date();
            jasmine.clock().mockDate(baseTime);

            //Execute
            Template.card.fireEvent("submit #card", eventObj);

            //Verify
            expect(Meteor.call).toHaveBeenCalledWith("submitCard", "testRoom",
                "good", "testThought", "testAuthor", 0);
            expect(Cards.insert).toHaveBeenCalledWith({
                roomCode: "testRoom",
                category: "good",
                createdAt: baseTime,
                text: "testThought",
                tags: [],
                likes: 0,
                author: "testAuthor",
                reveal: false
            });
            expect(Session.set).toHaveBeenCalledWith("author", "testAuthor");
            expect(eventObj.event.target.thoughts.value).toEqual("");
        });

        it("should submit the card with bad category", function() {
            //Setup
            event = jasmine.createSpyObj("event", ["target", "preventDefault"]);
            var eventObj = {
                event: {
                    target: {
                        thoughts: {
                            value: "testThought"
                        },
                        tags: {
                            value: ""
                        },
                        author: {
                            value: "testAuthor"
                        },
                        likes: {
                            value: 0
                        },
                        goodCategoryRadio: {
                            checked: false
                        },
                        badCategoryRadio: {
                            checked: true
                        }
                    },
                    preventDefault: function() {}
                }
            };

            spyOn(Session, "get").and.returnValue("testRoom");
            spyOn(Session, "set");
            var baseTime = new Date();
            jasmine.clock().mockDate(baseTime);

            //Execute
            Template.card.fireEvent("submit #card", eventObj);

            //Verify
            expect(Meteor.call).toHaveBeenCalledWith("submitCard", "testRoom",
                "bad", "testThought", "testAuthor", 0);
            expect(Cards.insert).toHaveBeenCalledWith({
                roomCode: "testRoom",
                category: "bad",
                createdAt: baseTime,
                text: "testThought",
                tags: [],
                likes: 0,
                author: "testAuthor",
                reveal: false
            });
            expect(Session.set).toHaveBeenCalledWith("author", "testAuthor");
            expect(eventObj.event.target.thoughts.value).toEqual("");
        });

    });

});

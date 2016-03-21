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
            spyOn(SnackbarMethods, "DisplayMessage");

            // Execute
            Template.cardSubmitArea.fireEvent("submit #card", eventObj);

            // Verify
            expect(SnackbarMethods.DisplayMessage).toHaveBeenCalledWith("Enter a thought",3000);

        });
alert

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
            spyOn(SnackbarMethods, "DisplayMessage");

            // Execute
            Template.cardSubmitArea.fireEvent("submit #card", eventObj);

            // Verify
            expect(SnackbarMethods.DisplayMessage).toHaveBeenCalledWith("Whose thought is this?",3000);
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
            spyOn(SnackbarMethods, "DisplayMessage");

            // Execute
            Template.cardSubmitArea.fireEvent("submit #card", eventObj);

            // Verify
            expect(SnackbarMethods.DisplayMessage).toHaveBeenCalledWith("Enter a category for your thought",3000);
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
            Template.cardSubmitArea.fireEvent("submit #card", eventObj);

            //Verify
            expect(Meteor.call).toHaveBeenCalledWith("submitCard", "testRoom",
                "Went Well", baseTime, "testThought", [], 0, "testAuthor", false,[]);
            expect(Cards.insert).toHaveBeenCalledWith({
                roomCode: "testRoom",
                category: "Went Well",
                createdAt: baseTime,
                text: "testThought",
                tags: [],
                likes: 0,
                author: "testAuthor",
                reveal: false,
                comments: []
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
            Template.cardSubmitArea.fireEvent("submit #card", eventObj);

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
                reveal: false,
                comments: []
            });
            expect(Session.set).toHaveBeenCalledWith("author", "testAuthor");
            expect(eventObj.event.target.thoughts.value).toEqual("");
        });

    });

});

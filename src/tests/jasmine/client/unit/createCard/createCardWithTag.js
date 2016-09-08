/*eslint-disable*/
describe("create cards with tags", function () {

    describe("invalid tags", function () {
        beforeEach(function () {
            spyOn(Meteor,"call");
        });

                it("should remove empty tags", function () {
                    //Setup
                    var eventObj = {
                        target :{
                            thoughts:{value:"testThought"},
                            tags:{value:",,"},
                            author:{value: "testAuthor"},
                            goodCategoryRadio: {
                                checked: true
                            },
                            badCategoryRadio: {
                                checked: false
                            }
                        },
                        preventDefault: function(){}
                    };

                    spyOn(Session, "get").and.returnValue("testRoom");
                    card = new Card()
                        .inRoom("testRoom")
                        .withCategory("Went Well")
                        .withText("testThought")
                        .createdBy("testAuthor");
                    //Execute
                    Template.cardSubmitArea.fireEvent("submit #card",{event:eventObj});
                    //Verify
                    expect(Meteor.call).toHaveBeenCalledWith("submitCard",card);
                });

                it("should remove duplicate tags", function () {
                    //Setup
                    var eventObj = {
                        target :{
                            thoughts:{value:"testThought"},
                            tags:{value:"test,test"},
                            author:{value: "testAuthor"},
                            goodCategoryRadio: {
                                checked: true
                            },
                            badCategoryRadio: {
                                checked: false
                            }
                        },
                        preventDefault: function(){}
                    };

                    spyOn(Session, "get").and.returnValue("testRoom");
                    card = new Card()
                        .inRoom("testRoom")
                        .withCategory("Went Well")
                        .withText("testThought")
                        .createdBy("testAuthor")
                        .withTags(["test"]);
                    //Execute
                    Template.cardSubmitArea.fireEvent("submit #card",{event:eventObj});
                    //Verify
                    expect(Meteor.call).toHaveBeenCalledWith("submitCard",card);
                });
    });

    describe("add valid tags to card", function () {

        beforeEach(function () {
            spyOn(Meteor, "call");
        });

        it("should add valid tags", function () {
            //Setup
            var eventObj = {
                target :{
                    thoughts:{value:"testThought"},
                    tags:{value:"this, is a,test"},
                    author:{value: "testAuthor"},
                    goodCategoryRadio: {
                        checked: true
                    },
                    badCategoryRadio: {
                        checked: false
                    }
                },
                preventDefault: function(){}
            };

            spyOn(Session, "get").and.returnValue("testRoom");
            var card = new Card()
                .inRoom("testRoom")
                .withCategory("Went Well")
                .withText("testThought")
                .createdBy("testAuthor")
                .withTags(["this","is a","test"]);
            //Execute
            Template.cardSubmitArea.fireEvent("submit #card",{event:eventObj});
            //Verify
            expect(Meteor.call).toHaveBeenCalledWith("submitCard",card);
        });
    });
});

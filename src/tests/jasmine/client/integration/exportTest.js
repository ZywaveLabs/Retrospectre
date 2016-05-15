/*eslint-disable*/
// import { Promise } from 'meteor/promise';÷

describe("Export Test ", function() {

    beforeEach(function (done) {

        var room = new Room().withRoomCode("ExportTestRoom");
        Meteor.call("createRoom", room);

        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        Router.go('/');
        Tracker.afterFlush(done);
    });

    beforeEach(waitForRouter);

    
    describe("Home page", function () {

        beforeEach(function (done) {
            expect($("h1").text()).toEqual("Welcome to the Retrospectre");
            $("#roomCode").val("ExportTestRoom");
            $("#joinRoom").click();
            Tracker.afterFlush(done);
        });

        beforeEach(waitForRouter);

        afterEach(function (done) {
            var cardsToRemove = Cards.find({
                "roomCode": "ExportTestRoom"
            });
            cardsToRemove.forEach(function(card){
                 Meteor.call("deleteCard", card._id);
            });
            Router.go('/');
            Tracker.afterFlush(done);
        });

        describe("Join test room", function () {

            beforeEach(function (done) {
                waitForElement("h1", function() {
                    expect($("h1").text()).toEqual("Sprint Retrospective");

                    //insert test cards
                    var card1 = new Card()
                    .inRoom("ExportTestRoom")
                    .withCategory("Went Well")
                    .withText("This is test data")
                    .createdBy("testAuthor1");
                    var card2 = new Card()
                    .inRoom("ExportTestRoom")
                    .withCategory("Went Poorly")
                    .withText("This is test data as well")
                    .createdBy("testAuthor2");

                    Meteor.call("submitCard", card1);
                    Meteor.call("submitCard", card2);

                    $("#exportButton").click();
                    Tracker.afterFlush(done);
                });
            });

            beforeEach(waitForRouter);

            it("should have default categories", function (done) {
                waitForElement("textarea", function() {
                    expect($("#textArea").val()).toContain("Went Well");
                    expect($("#textArea").val()).toContain("This is test data");
                    expect($("#textArea").val()).toContain("Went Poorly");
                    expect($("#textArea").val()).toContain("This is test data as well");
                    done();
                 });
            });
        });
    });
});

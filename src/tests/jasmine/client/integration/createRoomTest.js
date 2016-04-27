/*eslint-disable*/
// import { Promise } from 'meteor/promise';÷

describe("Create Room Test ", function() {

    beforeEach(function (done) {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        Router.go('/');
        Tracker.afterFlush(done);
    });

    beforeEach(waitForRouter);

    
    describe("Home page", function () {

        beforeEach(function (done) {
            expect($("h1").text()).toEqual("Welcome to the Retrospectre");
            $("#createRoomButton").click();
            Tracker.afterFlush(done);
        });

        beforeEach(waitForRouter);

        afterEach(function (done) {
            Router.go('/');
            Tracker.afterFlush(done);
        });

        describe("Create Room page with default categories", function () {

            beforeEach(function (done) {
                waitForElement("h1", function() {
                    expect($("h1").text()).toEqual("CREATE A ROOM");
                    $("#createAndJoinRoomButton").click();
                    Tracker.afterFlush(done);
                });
            });

            beforeEach(waitForRouter);

            describe("New room with default categories", function() {

                beforeEach(function (done) {
                    // waits for page to load
                    // there is probably a better way to do this
                    waitForElement("h1", function() {
                        done();
                    });
                });

                it("should have default categories", function (done) {
                    expect($("h1").text()).toEqual("Sprint Retrospective");
                    expect($("h2").text()).toContain("Went Well");
                    expect($("h2").text()).toContain("Went Poorly");
                    done();
                });

            });

            
        });

        describe("Create room page with custom categories", function () {

            beforeEach(function (done) {
                waitForElement("h1", function() {
                    expect($("h1").text()).toEqual("CREATE A ROOM");

                    $("#removeCategory").click();
                    $("#removeCategory").click();

                    // TODO this should use button clicks instead
                    Session.set("categoryToAdd", "customCategory2");
                    $("#addCustomCategoryButton").click();
                    Session.set("categoryToAdd", "customCategory1");
                    $("#addCustomCategoryButton").click();

                    $("#createAndJoinRoomButton").click();
                    Tracker.afterFlush(done);
                });
            });

            beforeEach(waitForRouter);

            describe("New room with custom categories", function() {

                beforeEach(function (done) {
                    waitForElement("h1", function() {
                        done();
                    });
                });

                it("should have custom categories", function (done) {
                    expect($("h1").text()).toEqual("Sprint Retrospective");

                    expect($("h2").text()).not.toContain("Went Well");
                    expect($("h2").text()).not.toContain("Went Poorly");

                    expect($("h2").text()).toContain("customCategory1");
                    expect($("h2").text()).toContain("customCategory2");
                    done();
                });
            });
        });
    });
});

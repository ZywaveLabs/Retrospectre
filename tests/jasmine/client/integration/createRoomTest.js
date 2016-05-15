/*eslint-disable*/
// import { Promise } from 'meteor/promise';÷

describe("Create Room Test ", function() {

    beforeEach(function (done) {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        spyOn(Meteor, "user").and.returnValue("Test User");
        Router.go('/');
        Tracker.afterFlush(done);
    });

    
    beforeEach(function (done) {
        waitForRouter(function() {
            done();
        });
    });

    
    describe("Home Page", function () {

        // verify we are on home page and click create room button
        beforeEach(function (done) {
            expect($("h1").text()).toEqual("Welcome to the Retrospectre");
            $("#createRoomButton").click();
            Tracker.afterFlush(function() {
                done();
            });
        });

         beforeEach(function (done) {
            waitForRouter(function() {
                done();
            });
        });

        afterEach(function (done) {
            Router.go('/');
            Tracker.afterFlush(function() {
                done();
            });
        });

        describe("Create a default room", function () {

            beforeEach(function (done) {
                waitForElement("h1", function() {
                    done();
                });
            });
            
            // verify we are on create room page and click create and join room button
            beforeEach(function (done) {
                expect($("h1").text()).toEqual("CREATE A ROOM");
                $("#createAndJoinRoomButton").click();
                Tracker.afterFlush(function() {
                    done();
                });
            });

            beforeEach(function (done) {
                waitForRouter(function() {
                    done();
                });
            });

            describe("New room with default categories", function() {

                beforeEach(function (done) {
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

        describe("New room with custom categories", function () {

            beforeEach(function (done) {
                waitForElement("h1", function() {
                    done();
                });
            });

            beforeEach(function (done) {
                expect($("h1").text()).toEqual("CREATE A ROOM");

                $("#removeCategory").click();
                $("#removeCategory").click();

                $("#addCustomCategoryText").val("customCategory2");
                $("#addCustomCategoryButton").click();

                $("#addCustomCategoryText").val("customCategory1");
                $("#addCustomCategoryButton").click();

                $("#createAndJoinRoomButton").click();
                Tracker.afterFlush(done);
            });

            beforeEach(function (done) {
                waitForRouter(function() {
                    done();
                });
            });

            describe("New room with custom categories", function() {

                it("should have custom categories", function (done) {
                    waitForElement("h1", function() {

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
});

/*eslint-disable*/
describe("landingPage", function() {
    
    describe("template", function() {

        beforeEach(function (done) {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            Router.go('/');
            Tracker.afterFlush(done);
        });

        beforeEach(waitForRouter);

        //TODO is looking at h1 best way to verify correct page?
        it("should create a page with default categories", function(done) {
            // verify we are on home page
            waitForElement("h1", function() {
                expect($("h1").text()).toEqual("Welcome to the Retrospectre");
                $("#createRoomButton").click();
                
                waitForElement("h1", function() {
                    expect($("h1").text()).toEqual("CREATE A ROOM");
                    Session.set("newRoomCode", "testRoomforTesting");

                    $("#createAndJoinRoomButton").click();
                    // verify page created and set up correctly

                    done();
                });

            });

            // create room

        });

    });

});

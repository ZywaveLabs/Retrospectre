/*eslint-disable*/
describe("liking a card tests", function () {
    beforeEach(function (done) {
      Meteor.loginWithGoogle(function(){
          Router.go("/room/testRoom");
          Tracker.afterFlush(function(){
            done();
          });
        }
      );
    });

    beforeEach(waitForRouter);

    afterEach(function(done){
        Meteor.logout(function () {
          done();
        });
    });

    it("should disable liking a card after initial click", function () {
        waitForElement("#clearFilter",function(){
            expect(Meteor.user()).not.toBeNull();
            //add a card first
            $(".form-modal").eq(0).click();
            expect($(".modal").eq(0).is(":visible")).toBe(true);
            $("#thoughts").eq(0).html("this is an integration test card");
            $("#submitCardButton").eq(0).click();
            $("#cardModalClose").eq(0).click();
            expect($(".modal").eq(0).is(":visible")).toBe(false);
            expect($(".card-panel").length).toEqual(1);
            //click like
            var expectedOutput = '<i class="fa fa-thumbs-o-up"></i>&nbsp;1&nbsp;&nbsp; Likes';
            $("#likeButton").click();
            expect($("#likeButton").html()).toEqual(expectedOutput);
            expect($("#likeButton").is(":disable")).toBe(true);
        });
    });
});

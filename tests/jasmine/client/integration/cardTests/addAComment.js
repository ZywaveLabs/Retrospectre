/*eslint-disable*/
describe("add a comment to a card tests", function () {
    beforeEach(function (done) {
          Router.go("/room/testRoom");
          Tracker.afterFlush(function(){
            done();
          });
    });

    beforeEach(waitForRouter);

    afterEach(function(done){
        done();
    });

    it("should add comment to a card with img", function () {
        Meteor.loginWithGoogle();
        waitForElement("#clearFilter",function(){
            expect(Meteor.user()).not.toEqual(undefined);;
            //add a card first
            $(".form-modal").eq(0).click();
            expect($(".modal").eq(0).is(":visible")).toBe(true);
            $("#thoughts").eq(0).html("this is an integration test card");
            $("#submitCardButton").eq(0).click();
            $("#cardModalClose").eq(0).click();
            expect($(".modal").eq(0).is(":visible")).toBe(false);
            expect($(".card-panel").length).toEqual(1);
            //click open modal
            $(".card-panel").click();
            $("input #comment").html("This is a comment");
            $("#submitCommentButton").click();
            expect($("ul.collapsible li").length).toEqual(1);
            expect($("ul.collapsible li div img").attr("src")).not.toBeNull();
            Meteor.logout();
        });
    });

    it("should add comment to a card with no img", function () {
        var setAlias = function(){
          $("#setAlias").click();
          $("#alias").html("tester");
          $("#submitAliasButton").click();

        };
        waitForElement("i.fa-sign-in",setAlias);
        waitForElement("#clearFilter",function(){
            expect(Meteor.user()).toEqual(undefined);;
            expect(Session.get("author")).toEqual("tester");
            //add a card first
            $(".form-modal").eq(0).click();
            expect($(".modal").eq(0).is(":visible")).toBe(true);
            $("#thoughts").eq(0).html("this is an integration test card");
            $("#submitCardButton").eq(0).click();
            $("#cardModalClose").eq(0).click();
            expect($(".modal").eq(0).is(":visible")).toBe(false);
            expect($(".card-panel").length).toEqual(1);
            //click open modal
            $(".card-panel").click();
            $("input #comment").html("This is a comment");
            $("#submitCommentButton").click();
            expect($("ul.collapsible li").length).toEqual(1);
            expect($("ul.collapsible li div img")).toEqual(undefined);
        });
    });

    it("should not add comment to a card", function () {
        Meteor.loginWithGoogle();
        waitForElement("#clearFilter",function(){
            expect(Meteor.user()).not.toEqual(undefined);;
            //add a card first
            $(".form-modal").eq(0).click();
            expect($(".modal").eq(0).is(":visible")).toBe(true);
            $("#thoughts").eq(0).html("this is an integration test card");
            $("#submitCardButton").eq(0).click();
            $("#cardModalClose").eq(0).click();
            expect($(".modal").eq(0).is(":visible")).toBe(false);
            expect($(".card-panel").length).toEqual(2);
            //click open modal
            $(".card-panel").eq(1).click();
            $("input #comment").html("This is a comment");
            $("#submitCommentButton").click();
            expect($("ul.collapsible li").length).toEqual(0);
            Meteor.logout();
        });
    });
});

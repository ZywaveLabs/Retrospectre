/*eslint-disable*/
describe("test card submission", function(){
    describe("successful submission", function () {
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

        it("submit a went well card without tags", function () {
            waitForElement("#clearFilter",function(){
                $(".form-modal").eq(0).click();
                expect($(".modal").eq(0).is(":visible")).toBe(true);
                $("#thoughts").eq(0).html("this is an integration test card");
                $("#submitCardButton").eq(0).click();
                $("#cardModalClose").eq(0).click();
                expect($(".modal").eq(0).is(":visible")).toBe(false);
                expect($(".card-panel").length).toEqual(1);
            });
        });

        it("submit a went well card with tags", function () {
            waitForElement("#clearFilter",function(){
                $(".form-modal").eq(0).click();
                expect($(".modal").eq(0).is(":visible")).toBe(true);
                $("#thoughts").eq(0).html("this is an integration test card");
                $("#tags").eq(0).html("integration,tests,tags");
                $("#submitCardButton").eq(0).click();
                $("#cardModalClose").eq(0).click();
                expect($(".modal").eq(0).is(":visible")).toBe(false);
                expect($(".card-panel").length).toEqual(2);
            });
          });

          it("submit a went poorly card without tags", function () {
              waitForElement("#clearFilter",function(){
                  $(".form-modal").eq(1).click();
                  expect($(".modal").eq(1).is(":visible")).toBe(true);
                  $("#thoughts").eq(1).html("this is an integration test card");
                  $("#submitCardButton").eq(1).click();
                  $("#cardModalClose").eq(1).click();
                  expect($(".modal").eq(1).is(":visible")).toBe(false);
                  expect($(".card-panel").length).toEqual(3);
              });
          });

          it("submit a went poorly card with tags", function () {
              waitForElement("#clearFilter",function(){
                  $(".form-modal").eq(1).click();
                  expect($(".modal").eq(1).is(":visible")).toBe(true);
                  $("#thoughts").eq(1).html("this is an integration test card");
                  $("#tags").eq(1).html("integration,tests,tags");
                  $("#submitCardButton").eq(1).click();
                  $("#cardModalClose").eq(1).click();
                  expect($(".modal").eq(1).is(":visible")).toBe(false);
                  expect($(".card-panel").length).toEqual(4);
              });
          });

          it("submit a went poorly card from went well modal", function () {
              waitForElement("#clearFilter",function(){
                  $(".form-modal").eq(0).click();
                  expect($(".modal").eq(0).is(":visible")).toBe(true);
                  $("#thoughts").eq(0).html("this is an integration test card");
                  $(".categoryDropdown").eq(0).click();
                  expect($("option").eq(0).html()).toEqual("Went Well");
                  expect($("option").eq(2).html()).toEqual("Went Poorly");
                  $("option").eq(2).click();
                  $("#submitCardButton").eq(0).click();
                  $("#cardModalClose").eq(0).click();
                  expect($(".modal").eq(0).is(":visible")).toBe(false);
                  expect($(".card-panel").length).toEqual(5);
              });
          });

          it("submit a went well card from went poorly modal", function () {
              waitForElement("#clearFilter",function(){
                  $(".form-modal").eq(1).click();
                  expect($(".modal").eq(1).is(":visible")).toBe(true);
                  $("#thoughts").eq(1).html("this is an integration test card");
                  $(".categoryDropdown").eq(1).click();
                  expect($("option").eq(3).html()).toEqual("Went Poorly");
                  expect($("option").eq(5).html()).toEqual("Went well");
                  $("option").eq(5).click();
                  $("#tags").eq(1).html("integration,tests,tags");
                  $("#submitCardButton").eq(1).click();
                  $("#cardModalClose").eq(1).click();
                  expect($(".modal").eq(1).is(":visible")).toBe(false);
                  expect($(".card-panel").length).toEqual(6);
              });
          });
      });

      describe("failure card submission", function () {
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

          it("submit a went well card without a thought", function () {
              waitForElement("#clearFilter",function(){
                  $(".form-modal").eq(0).click();
                  expect($(".modal").eq(0).is(":visible")).toBe(true);
                  $("#thoughts").eq(0).html("");
                  $("#submitCardButton").eq(0).click();
                  $("#cardModalClose").eq(0).click();
                  expect($(".modal").eq(0).is(":visible")).toBe(false);
                  expect($(".card-panel").length).toEqual(0);
              });
          });

          it("submit a went poorly card without a thought", function () {
              waitForElement("#clearFilter",function(){
                  $(".form-modal").eq(1).click();
                  expect($(".modal").eq(1).is(":visible")).toBe(true);
                  $("#thoughts").eq(1).html("");
                  $("#submitCardButton").eq(1).click();
                  $("#cardModalClose").eq(1).click();
                  expect($(".modal").eq(1).is(":visible")).toBe(false);
                  expect($(".card-panel").length).toEqual(0);
              });
            });

      });
});

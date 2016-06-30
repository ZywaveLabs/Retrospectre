/*eslint-disable*/
describe("add comments to cards",function(){

    describe("invalid comments", function () {
        it("should not submit if comment is not long enough", function () {
            //Setup
            var eventObj = {
                event: {
                    target:{
                        form: {[0]:{value: "bad"}}
                    },
                    preventDefault: function(){}
                }
            };
            spyOn(SnackbarMethods,"DisplayMessage");
            //Execute
            Template.cardModal.fireEvent("click #submitCommentButton",eventObj);

            //Verify
            expect(SnackbarMethods.DisplayMessage).toHaveBeenCalledWith("Enter a more valuable comment",3000);
            expect(eventObj.event.target.form[0].value).toEqual("bad");
        });
    });

    describe("valid comments", function () {
        it("should submit valid comment without user sign in", function () {
            //Setup
            var eventObj = {
                context:{
                    _id: "testID"
                },
                event: {
                    target:{
                        form: {[0]:{value: "this is a valid comment"}}
                    },
                    preventDefault: function(){}
                }
            };
            spyOn(Meteor,"user").and.returnValue(null);
            spyOn(Session,"get").and.returnValue("test author");
            spyOn(Meteor, "call").and.callThrough();
            var mockedTime = new Date();
            var comment = new Comment().createdBy("test author")
              .withText("this is a valid comment").createdAtTime(mockedTime).withAvatar(null);
            jasmine.clock().mockDate(mockedTime);
            //Execute
            Template.cardModal.fireEvent("click #submitCommentButton",eventObj);

            //Verify
            expect(Meteor.call).toHaveBeenCalledWith("submitComment","testID",comment);
            expect(eventObj.event.target.form[0].value).toEqual("");

        });

        it("should submit comment with user signed in", function () {
            //Setup
            var eventObj = {
                context:{
                    _id: "testID"
                },
                event: {
                    target:{
                        form: {[0]:{value: "this is a valid comment"}}
                    },
                    preventDefault: function(){}
                }
            };
            spyOn(Meteor,"user").and.returnValue({
              profile:{
                name : "Google User"
              }
            });
            spyOn(UserMethods,"getUserImage").and.returnValue("some image");
            spyOn(Meteor, "call").and.callThrough();
            var mockedTime = new Date();
            //var author =  Object({ profile: Object({ name: 'Google User' }) });
            var comment = new Comment().createdBy("Google User")
              .withText("this is a valid comment").createdAtTime(mockedTime).withAvatar("some image");
            jasmine.clock().mockDate(mockedTime);
            //Execute
            Template.cardModal.fireEvent("click #submitCommentButton",eventObj);

            //Verify
            expect(Meteor.call).toHaveBeenCalledWith("submitComment","testID",comment);
            expect(eventObj.event.target.form[0].value).toEqual("");
        });
    });
});

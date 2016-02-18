if (Meteor.isClient) {

    Template.headerFooter.onCreated(function() {
        Session.set("theme", "darkly");
    });

    Template.headerFooter.helpers({
        getTheme: function() {
            return Session.get("theme");
        }
    });
}

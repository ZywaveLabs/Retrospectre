if (Meteor.isClient) {

    Template.headerFooter.onCreated(function() {
        Session.set("theme", "superhero");
    });

    Template.headerFooter.helpers({
        getTheme: function() {
            return Session.get("theme");
        }
    });
}

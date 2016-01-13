Router.configure({
	layoutTemplate: 'headerFooter'
});
Router.route('/',{
	name: 'Home',
	template:'landingPage',
	title:'Home'
});
if(Meteor.isClient){
Template.headerFooter.helpers({
  title:function(){
    return Router.current().route.options.title;
  }
});
}

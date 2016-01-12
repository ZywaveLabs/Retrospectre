![Logo](spectre.png)
# Retrospectre
MSOE SDL project.

[![Build Status](https://travis-ci.org/Zywave/Retrospectre.svg?branch=master)](https://travis-ci.org/Zywave/Retrospectre)

### Folder structure (From [meteor-boilerplate](https://github.com/matteodem/meteor-boilerplate))
```
client/ 				# Client folder
    compatibility/      # Libraries which create a global variable
    config/             # Configuration files (on the client)
	lib/                # Library files that get executed first
    startup/            # Javascript files on Meteor.startup()
    stylesheets         # LESS files
    modules/            # Meant for components, such as form and more(*)
	views/			    # Contains all views(*)
	    common/         # General purpose html templates
model/  				# Model files, for each Meteor.Collection(*)
private/                # Private files
public/                 # Public files
routes/                 # All routes(*)
server/					# Server folder
    fixtures/           # Meteor.Collection fixtures defined
    lib/                # Server side library folder
    publications/       # Collection publications(*)
    startup/            # On server startup
meteor-boilerplate		# Command line tool
```


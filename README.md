![Logo](spectre.png)
# Retrospectre
MSOE SDL project.

[![Build Status](https://travis-ci.org/Zywave/Retrospectre.svg?branch=master)](https://travis-ci.org/Zywave/Retrospectre)

## Temporary demo location
[Demo](http://74.91.115.65/)

##Live Deploy
[[The Retrospectre]](http://src-53.nodechef.com/)

# Building Locally
## Requirements
* [Node](https://nodejs.org/)
* npm (Installs with node)
* [Meteor](https://www.meteor.com/install)


## Commands
```
git clone https://github.com/Zywave/Retrospectre.git
cd Retrospectre/
npm install
npm install gulp -g  # This only has to be done once per machine
cd src/
meteor
```
The app should be running normally

# Linting
From project home, type `gulp lint`

It is recommended that you move the `pre-commit` file at the project base into your `.git/hooks/` folder to automatically run gulp each time you commit.

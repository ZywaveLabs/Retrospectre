#!/bin/bash

# Change to appropriate hostname
url=$RELEASE_URL
meteor_location="/usr/local/bin/meteor"
if ps ax | grep '[m]eteor' > /dev/null
then
    echo "Process already exists"
else
    echo "Starting Process"
    DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
    cd $DIR
    export ROOT_URL=$url
    # -d argument will disconnect the process from terminal, making it safe to
    # disconnect from ssh
    # I honestly don't think this is even needed anyways, but, doesn't hurt
    if [ "$1" == "-d" ]
    then
        eval "nohup $meteor_location --production --port 80 >> /var/log/Retrospectre.log 2>&1 &"
        disown
    else
        eval "$meteor_location --production --port 80 >> /var/log/Retrospectre.log 2>&1"
    fi
fi

exit 0
# One line to run from ssh to keep process running after disconnecting
# sudo ROOT_URL=$url nohup meteor --production --port 80 &; disown

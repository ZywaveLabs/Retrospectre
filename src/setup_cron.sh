#!/bin/bash

# Remove existing script, don't have multiple of same job running
crontab -l | grep -v 'start_retrospectre.sh' >> temp_retro
crontab temp_retro
rm temp_retro

# Call script with -r command to only remove. not re-add
if [ "$1" != "-r" ]
then
    #write out current crontab
    crontab -l > Retrospectre

    #echo new cron into cron file
    echo "* * * * * $PWD/start_retrospectre.sh" >> Retrospectre

    #install new cron file
    crontab Retrospectre
    rm Retrospectre
fi

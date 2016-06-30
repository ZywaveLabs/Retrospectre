#!/bin/bash

if ps ax | grep '[m]eteor' > /dev/null
then
    kill `ps ax | grep '[m]eteor' | awk '{print $1}'`
fi

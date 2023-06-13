#!/bin/bash

if [ "$1" == "start" ]; then
    docker-compose -f ./deploy/docker-compose/docker-compose.yml up
elif [ "$1" == "stop" ]; then
    docker-compose -f ./deploy/docker-compose/docker-compose.yml down
else
    echo "Usage: $0 [start|stop]"
fi

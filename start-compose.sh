#!/bin/bash

export root_dir=`pwd`
if [ "$1" == "start" ]; then
    docker-compose -f ./deploy/docker-compose/docker-compose.yml up
elif [ "$1" == "stop" ]; then
    docker-compose -f ./deploy/docker-compose/docker-compose.yml down
elif [ "$1" == "build" ]; then

    ./deploy/build-server.sh && ./deploy/build-web.sh
else
    echo "Usage: $0 [start|stop|build]"
fi

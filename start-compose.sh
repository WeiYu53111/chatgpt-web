#!/bin/bash

export root_dir=$(pwd)
if [ "$1" == "up" ]; then
    if [ "$2" == "-d" ]; then
        docker compose -f ./deploy/docker-compose/docker-compose.yml up -d
    else
        docker compose -f ./deploy/docker-compose/docker-compose.yml up
    fi
elif [ "$1" == "down" ]; then
    docker compose -f ./deploy/docker-compose/docker-compose.yml down
elif [ "$1" == "start" ]; then
    docker compose -f ./deploy/docker-compose/docker-compose.yml start
elif [ "$1" == "stop" ]; then
    docker compose -f ./deploy/docker-compose/docker-compose.yml stop
elif [ "$1" == "build" ]; then
    sh ./deploy/build-server.sh && sh ./deploy/build-web.sh
else
    echo "Usage: $0 [start [-d]|stop|build]"
fi


# ./script-name.sh start -d  # 在后台启动 Docker 容器
# ./script-name.sh start     # 在前台启动 Docker 容器（默认）
# ./script-name.sh stop      # 停止 Docker 容器
# ./script-name.sh build     # 构建应用程序镜像
server_dir=$root_dir/server
docker build -t nest:v0.1 -f $server_dir/Dockerfile $server_dir
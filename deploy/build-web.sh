web_dir=$root_dir/web
docker build -t web:v0.1 -f $web_dir/Dockerfile $web_dir
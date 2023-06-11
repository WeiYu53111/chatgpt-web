# build front-end
FROM node:lts-alpine AS frontend

RUN npm install pnpm -g

WORKDIR /app

COPY ./package.json /app

COPY ./pnpm-lock.yaml /app

RUN pnpm install

COPY . /app

RUN pnpm run build

ADD .env /app/dist


# nginx
FROM nginx:1.25-alpine



RUN mkdir /app

# 将之前构建好的生产模式下的静态资源复制到 Nginx 的默认目录下
COPY --from=frontend /app/dist /app
# 将 ./nginx.conf 复制到容器中的 /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf/nginx.conf

# 设置时区
ENV TZ=Asia/Shanghai

EXPOSE 80
# 在容器启动时运行 Nginx 服务
CMD ["nginx", "-g", "daemon off;"]

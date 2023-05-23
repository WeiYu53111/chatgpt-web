# build front-end
FROM node:lts-alpine AS frontend

RUN npm install pnpm -g

WORKDIR /app

COPY ./package.json /app

COPY ./pnpm-lock.yaml /app

RUN pnpm install

COPY . /app

RUN pnpm run build

# build backend
FROM node:lts-alpine as backend

RUN npm install pnpm -g

WORKDIR /app

COPY ./service/package.json /app

COPY ./service/pnpm-lock.yaml /app

RUN pnpm install

COPY ./service /app

RUN pnpm build

# service
FROM node:lts-alpine

# 为了安装sqlite3需要安装一些编译工具
RUN npm install pnpm -g

WORKDIR /app

COPY ./service/package.json /app
COPY ./service/pnpm-lock.yaml /app

# 安装sqlite3
# RUN pnpm install sqlite3
RUN pnpm install --production && rm -rf /root/.npm /root/.pnpm-store /usr/local/share/.cache /tmp/*

COPY ./service /app
ADD ./service/.env /app/build/.env
COPY --from=frontend /app/dist /app/public
COPY --from=backend /app/build /app/build
#COPY --from=backend /app/.env /app/build

# 设置时区
ENV TZ=Asia/Shanghai

EXPOSE 3002

CMD ["pnpm", "run", "prod"]

# ChatGPT Web

## 介绍

本项目基于开源项目 https://github.com/Chanzhaoyu/chatgpt-web 修改.
增加了用户注册、用户登录、次数限制等功能，等第一版release出来后，打算用NestJS重构一下.README晚点再补充吧

### 2023.06.11
后端已经独立到`chat-gpt-web-ts`项目里面了




## 环境要求

### Node

`node` 需要 `^16 || ^18 || ^19` 版本（`node >= 14` 需要安装 [fetch polyfill](https://github.com/developit/unfetch#usage-as-a-polyfill)），使用 [nvm](https://github.com/nvm-sh/nvm) 可管理本地多个 `node` 版本

```shell
node -v
```

### PNPM

如果你没有安装过 `pnpm`

```shell
npm install pnpm -g
```

### docker-compose安装
```shell
yum install docker-compose-plugin

## 验证安装成功
docker compose version
```



## 项目部署

### 使用Docker部署

#### 步骤1.构建镜像

因为后端已经独立出去,最好是使用docker-compose的方式运行.如果想要手动启动前后端镜像的,
需要修改ngixn配置文件中后端的IP地址。

##### 前端镜像
```bash

# 项目根目录下
docker build -t gpt-web .

```

##### 后端镜像

```shell
## 项目`chat-gpt-web-ts`根目录下
docker build -t gpt-server .

```
详情请看后端镜像部署说明


#### 步骤2.



## License
MIT © [ChenZhaoYu](./license)

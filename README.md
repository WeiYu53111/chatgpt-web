# ChatGPT Web

## 介绍

本项目基于开源项目 https://github.com/Chanzhaoyu/chatgpt-web 修改.
目前是增加了用户注册、用户登录、次数限制等功能，等第一版release出来后，打算用NestJS重构一下.README晚点再补充吧

环境变量：

全部参数变量请查看或[这里](#环境变量)
```
/service/.env.example
```

## 前置要求

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

## 运行 or 打包前配置

service目录下创建.env文件,并确保里面有如下配置项,否则无法启动服务端

- `OPENAI_API_MODEL` 设置模型，可选，默认：gpt-3.5-turbo
- `OPENAI_API_BASE_URL` 设置接口地址，可选，默认：https://api.openai.com
- `OPENAI_API_DISABLE_DEBUG` 设置接口关闭 debug 日志，可选，默认：empty 不关闭
- `EMAIL_SERVER` smtp服务器地址,如使用网易邮箱则是smtp.163.com
- `EMAIL_USER` 发送邮箱验证码的邮箱账号
- `EMAIL_PASSWORD` 邮箱账号密码

## 项目运行

### 后端

进入文件夹 `/service` 运行以下命令

```shell
pnpm install
```

### 前端
根目录下运行以下命令
```shell
pnpm bootstrap
```

## 开发环境运行
### 后端服务

进入文件夹 `/service` 运行以下命令

```shell
pnpm start
```

### 前端网页
根目录下运行以下命令
```shell
pnpm dev
```

## 打包

### 使用 Docker

#### Docker build & Run

```bash

# 项目根目录下
docker build -t chatgpt-web .

# 后台运行
docker run --name chatgpt-web -d -p 3002:3002 chatgpt-web

# 运行地址
http://localhost:3002/
```
### 手动打包
#### 后端服务
> 如果你不需要本项目的 `node` 接口，可以省略如下操作

复制 `service` 文件夹到你有 `node` 服务环境的服务器上。

```shell
# 安装
pnpm install

# 打包
pnpm build

# 运行
pnpm prod
```

PS: 不进行打包，直接在服务器上运行 `pnpm start` 也可

#### 前端网页

1、修改根目录下 `.env` 文件中的 `VITE_GLOB_API_URL` 为你的实际后端接口地址

2、根目录下运行以下命令，然后将 `dist` 文件夹内的文件复制到你网站服务的根目录下

[参考信息](https://cn.vitejs.dev/guide/static-deploy.html#building-the-app)

```shell
pnpm build
```

## 常见问题
Q: 为什么 `Git` 提交总是报错？

A: 因为有提交信息验证，请遵循 [Commit 指南](./CONTRIBUTING.md)

Q: 如果只使用前端页面，在哪里改请求接口？

A: 根目录下 `.env` 文件中的 `VITE_GLOB_API_URL` 字段。

Q: 文件保存时全部爆红?

A: `vscode` 请安装项目推荐插件，或手动安装 `Eslint` 插件。

Q: 前端没有打字机效果？

A: 一种可能原因是经过 Nginx 反向代理，开启了 buffer，则 Nginx 会尝试从后端缓冲一定大小的数据再发送给浏览器。请尝试在反代参数后添加 `proxy_buffering off;`，然后重载 Nginx。其他 web server 配置同理。

## License
MIT © [ChenZhaoYu](./license)

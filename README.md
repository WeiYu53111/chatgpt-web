# 简介
啥也没有

# 部署


## docker-compose

```shell

# 准备好代码
git clone https://github.com/WeiYu53111/chatgpt-web.git
cd chatgpt-web
chmod +x ./start-compose.sh

# 将私钥以及.env 配置文件放到 server目录下
...

# 构建镜像
./start-compose.sh build


# 启动服务
./start-compose.sh start -d
```



# 生成公私钥

随便找个目录
```shell
mkdir test_dir
cd test_dir
npm init
```

安装`node-rsa`库
```shell
npm install node-rsa
```

添加key.js文件,代码如下
```javascript
//输出公私钥的代码

const fs = require('fs');
const NodeRSA = require('node-rsa');

const generateKeyPair = (filePath) => {
  const key = new NodeRSA({ b: 2048 });

  const publicKey = key.exportKey('pkcs1-public-pem');
  const privateKey = key.exportKey('pkcs1-private-pem');

  return new Promise((resolve, reject) => {
    fs.writeFile(filePath + '.pub', publicKey, (error) => {
      if (error) {
        reject(error);
      } else {
        console.log(`公钥已保存至 ${filePath}.pub`);
        resolve();
      }
    });

    fs.writeFile(filePath + '.pri', privateKey, (error) => {
      if (error) {
        reject(error);
      } else {
        console.log(`私钥已保存至 ${filePath}.pri`);
        resolve();
      }
    });
  });
};

// 使用示例：
generateKeyPair('./mykey')
.then(() => {
  console.log('密钥对生成成功！');
})
.catch((error) => {
  console.error('密钥对生成失败：', error);
}
);

```

执行以下命令则会在当前目录生成公私钥文件了
```
npm install
node key.js
```
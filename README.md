# 简介
啥也没有

# 部署


## docker-compose



### step1.准备好代码
```
git clone https://github.com/WeiYu53111/chatgpt-web.git
cd chatgpt-web
chmod +x ./start-compose.sh
```

### step2.创建数据库存储目录

数据库挂载目录默认是当前目录的`mysql`文件夹,如果要修改则需要修改
`deploy/docker-compose/docker-compose.yml`

```shell
mkdir mysql
```

### step3.更新web的公钥
修改`web/src/utils/crypto/index.ts` 文件中的公钥, 修改为你自己的公钥
修改示例如下：
```typescript
const pub_key = "-----BEGIN RSA PUBLIC KEY-----\n" +
	"MIIBCgKCAQEAh6ahoQ6x42ds+vVK8uVYt2tWHJ2+P/yDNwboSadkDJoR8XWqO7bZ\n" +
	"iAalONDVOHByhCRUC8Iakbsequs343A7ON7odnbPBmgNTsLONOVad5EcNBEAsHNo\n" +
	"3KuWRfFBokWs5TgzqezBIyTj7TiQzNiHcLzTXxt59T4ACsturH22Ph0JlRMjK5Cu\n" +
	"6SBcWWC0lBk2kCqaIw/l7c2xai6Q3b70EldkxijlaqjM3TJlm9cZbgPa71MrWXpS\n" +
	"61TmsFdMpVJ9q7v4dVymEyv4RGoQR4MYau9xGHUT27LZJT4QTliM5ZN9Pn0nni6t\n" +
	"V2ASS7kG4S3PvL03epg/ynTU1vsCuREfXQIDAQAB\n" +
	"-----END RSA PUBLIC KEY-----";
```

### step4.放置私钥以及配置文件.env到
私钥文件名称需要与`.env`配置文件中的`RSA_FILE`配置项一致
```.properties
RSA_FILE=pri_20230616.pri
```
则私钥文件名为`pri_20230616.pri`.

将私钥以及.env 配置文件放到`server`根目录下

### step5.构建镜像
```shell
./start-compose.sh build
```

### step6.启动服务
```shell
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
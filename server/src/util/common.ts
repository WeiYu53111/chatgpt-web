export function getSysdate() {
  const date = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const formattedDate = formatter.format(date);

  //console.log(formattedDate); // 输出类似于"2022-04-01 09:00:00"的字符串
  return formattedDate;
}

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}${month}${day}`;
}

/*
输出公私钥的代码

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
    });*/

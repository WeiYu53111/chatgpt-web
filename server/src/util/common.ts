import NodeRSA from 'node-rsa';

const pri_key =
  '-----BEGIN RSA PRIVATE KEY-----\n' +
  'MIIEogIBAAKCAQEAh6ahoQ6x42ds+vVK8uVYt2tWHJ2+P/yDNwboSadkDJoR8XWq\n' +
  'O7bZiAalONDVOHByhCRUC8Iakbsequs343A7ON7odnbPBmgNTsLONOVad5EcNBEA\n' +
  'sHNo3KuWRfFBokWs5TgzqezBIyTj7TiQzNiHcLzTXxt59T4ACsturH22Ph0JlRMj\n' +
  'K5Cu6SBcWWC0lBk2kCqaIw/l7c2xai6Q3b70EldkxijlaqjM3TJlm9cZbgPa71Mr\n' +
  'WXpS61TmsFdMpVJ9q7v4dVymEyv4RGoQR4MYau9xGHUT27LZJT4QTliM5ZN9Pn0n\n' +
  'ni6tV2ASS7kG4S3PvL03epg/ynTU1vsCuREfXQIDAQABAoIBACQLTMtE4lOwea69\n' +
  'WurrsgUaykjUSWcrK5qFhVd82QLYNYhZYaB4V5jjWyebpexXRLaECKkPLIwokl+M\n' +
  'HM+cVMApys8fhqcHIvIYpT486yr2Le5PzkUUhXqNRWLUVkJODUDjDCdMt40lEkNI\n' +
  'UoF7z5FPO0L8RA28Kbq0j3XZ+YDLRVgrHjMsh/u2/jfCtppUgt8/sQrYuhzpo1SS\n' +
  'zn5fJQaO2tvy1lbubrUo8XFGZ/dPjlM9B4wq6n6z2l01Bhkxf9hEt/jWrPyTk7WJ\n' +
  'UHPcRqitUOKvAxJuic0sSAv5e//3KUebQ6KIAAcLHXtAps2VvYCf84s09wPrnfTu\n' +
  'VmxcxQECgYEA5F72woBb+MmfOL8GpGue9vb9nyIyvmJ64wPBE5kE+LwusBUIOs+c\n' +
  '1YXunvUsdKD5LcwcoEtfN2VZGxBg1A6K3reyes67tROdzxykBIolBvrg/jixqDho\n' +
  'HhFiVK1MouFKe+B4rJFtAracmPxJ5nZrEUKMCIHDekV1JzzFP/htwyECgYEAmA/4\n' +
  'Wu5gvPDM4PA4ZJWSE1KxE+YNkJn/oB5rzDlS8BwIoyCX+Vi8FlYQfZ07GulVRgsz\n' +
  'j+OGiAVgL7FCixRUpTCYnUsmkwqpLTnPqQzya83oJRPORfQBT7yIxeLxRtD93amS\n' +
  'Wsybhj4pwSIQvx+hrj4D1/wlYzeEImCqq88WEL0CgYA1o3xv6LgxciHcsTl9Ku32\n' +
  'ccLWOrESeI0Gfx49XSaGyaRppTb+oT7kBAYs/ccISbrdH+DlYW6m0z4fljQ3+oZx\n' +
  'k1HveFksScQ6Hi8EBfJ2djycWXKY4U7LKSggXWfvpdzZxbpyReIFziBv6mntIIk7\n' +
  'T5cWdGwWbvP6WFK4GMCnIQKBgAs9QvIVpHjSo5IMr15f38gl2IjL/Dyv5UEEfps9\n' +
  'sW+l4s2L3y/C60QLYHSoZnH6xR7EPS9pdcwf+ZgM1gpJmmgLS3x0zYkYxKBfIYYx\n' +
  'OsnVEk+LQzfQbThjiwh1WbgOQnVbz0F+1g/6EEQCLJKz19N1KfuQ24KV2+Jemr7Q\n' +
  'M6VRAoGACkkAcOcdDErRx1zJ9Ztnxtet8p1N/U8BE3Wm2SppeJqduutkf6vh1KSq\n' +
  'vYVKI4q/VhtigQ4oOePFXlxUvbk5Cuz3cgHnH1SvjyJGGAZS1SOxzoU2iR++QRjF\n' +
  '0+7HAMAduxewzB/E77JacWQQgH5FXLGoZ70dR02UHtDqvWDjonw=\n' +
  '-----END RSA PRIVATE KEY-----';

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

const encoding = 'utf-8';
const key = new NodeRSA(pri_key, 'pkcs1-private-pem', {
  encryptionScheme: 'pkcs1',
});
const decoder = new TextDecoder(encoding); // 创建解码器

export function rsa_decode(content: string) {
  const decryptedData = key.decrypt(content, 'utf8'); // 解密得到字节数组
  //const plaintext = decoder.decode(decryptedData); // 将字节数组按指定编码转换为字符串
  return decryptedData;
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

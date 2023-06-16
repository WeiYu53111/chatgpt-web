import CryptoJS from 'crypto-js'
import { JSEncrypt } from 'jsencrypt';
const CryptoSecret = '__CRYPTO_SECRET__'

export function enCrypto(data: any) {
  const str = JSON.stringify(data)
  return CryptoJS.AES.encrypt(str, CryptoSecret).toString()
}

export function deCrypto(data: string) {
  const bytes = CryptoJS.AES.decrypt(data, CryptoSecret)
  const str = bytes.toString(CryptoJS.enc.Utf8)

  if (str)
    return JSON.parse(str)

  return null
}


const pub_key = "-----BEGIN RSA PUBLIC KEY-----\n" +
	"MIIBCgKCAQEAh6ahoQ6x42ds+vVK8uVYt2tWHJ2+P/yDNwboSadkDJoR8XWqO7bZ\n" +
	"iAalONDVOHByhCRUC8Iakbsequs343A7ON7odnbPBmgNTsLONOVad5EcNBEAsHNo\n" +
	"3KuWRfFBokWs5TgzqezBIyTj7TiQzNiHcLzTXxt59T4ACsturH22Ph0JlRMjK5Cu\n" +
	"6SBcWWC0lBk2kCqaIw/l7c2xai6Q3b70EldkxijlaqjM3TJlm9cZbgPa71MrWXpS\n" +
	"61TmsFdMpVJ9q7v4dVymEyv4RGoQR4MYau9xGHUT27LZJT4QTliM5ZN9Pn0nni6t\n" +
	"V2ASS7kG4S3PvL03epg/ynTU1vsCuREfXQIDAQAB\n" +
	"-----END RSA PUBLIC KEY-----";
// 创建 JSEncrypt 实例
const encryptor = new JSEncrypt();

encryptor.setPublicKey(pub_key);
const encoding = 'utf-8'; // 明文编码方式
const encoder = new TextEncoder(); // 创建编码器

export function rsaEncode(plaintext: string){
	const data = encoder.encode(plaintext); // 将明文转换为字节数组
	const encodedData = new TextDecoder(encoding).decode(data); // 将字节数组按指定编码转换为字符串
	//使用 jsencrypt 的 rsa 加密密码
	const encryptedStr = encryptor.encrypt(encodedData);
	return encryptedStr
}


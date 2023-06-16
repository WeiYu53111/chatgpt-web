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
	"MIIBCgKCAQEArS2xbGwG19DGhf/kyEuBKgLmC38Akv36QuKTLNg/Gls43OrEQEUY\n" +
	"TlPU03IWlHfECbqwCWi/lxGTq1DL/mX5sX30qJbHH6QbivUYihTNPBWPAd7yi7KU\n" +
	"nC9LlVQOLY21a174j88h65wCeD3pMtAm5Ts0MNESMfglEC9rozu+xJFlidjlHlor\n" +
	"Rdg1ma8nDyRENFuxMAKp+wrR7VTTNLtERYt32hlybAT8OhTzDwjZLvfFqdjoxdbC\n" +
	"tkkGcO+bJTXcTPCW6CgLqvAvqv1U+P+FWxwqBesDxwJC41XU1fvtWZjMIhhEe2It\n" +
	"obIXp2t96Ic5xE4yMuhFYzIRKPYqxrCLWwIDAQAB\n" +
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


import JSEncrypt from 'jsencrypt'

export function encrypt(pubKey: string, password: string) {
  const encryptor = new JSEncrypt() // 创建加密对象实例
  encryptor.setPublicKey(pubKey)
  const rsaPassWord = encryptor.encrypt(password)
  return rsaPassWord
}

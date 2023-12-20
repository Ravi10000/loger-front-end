import CryptoJS from "crypto-js";
const secret = import.meta.env.VITE_URL_SECRET_KEY;
const encrypt = (data) => {
  const cipherText = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secret
  ).toString();
  return cipherText;
};

const decrypt = (cipherText) => {
  cipherText = cipherText.replace(/ /g, "+");
  const plainText = JSON.parse(
    CryptoJS.AES.decrypt(cipherText, secret).toString(CryptoJS.enc.Utf8)
  );
  return plainText;
};
export { encrypt, decrypt };

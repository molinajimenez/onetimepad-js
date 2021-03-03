import Encrypter from './Cipher.js'


let enc = new Encrypter();

enc.encrypt("hola");
console.log(enc.decrypt());
enc.dump_key();
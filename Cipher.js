import {latin_alphabet} from "./helper/alphabets.js"

export default class Encrypter {
  constructor(string) {
    this.txt = String(string).toLocaleLowerCase();
    this.key = undefined;
    this.encrypted = undefined;
    
  }

  str_to_bin = (string) => {
    let binary = "";
    for (let i = 0; i < string.length; i++) {
      //binary letter
      binary += string.charCodeAt(i).toString(2);
    }

    return binary;
  };

  key_gen = () => {
    let key = "";
    for (let i = 0; i < this.txt.length; i++) {
        key += latin_alphabet[Math.floor(Math.random()*latin_alphabet["length"])]
    }
  
    return this.str_to_bin(key);
    
  };

  encrypt = () =>{

    this.key_gen()
    this.encrypted = this.str_to_bin(this.txt);
    this.key = this.key_gen();
    
    
    return this.xor(this.encrypted, this.key);
  }

  xor = (a, b) => {
    let ans = ""
    for(let i=0; i < a.length; i++){
      a[i] == b[i] ? ans += "0" : ans += "1";
    }
    return ans
  }
}



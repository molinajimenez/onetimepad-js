import { exit } from "process";
import {latin_alphabet} from "./helper/alphabets.js";
import * as fs from 'fs';
export default class Encrypter {
  constructor() {
    this.txt = undefined;
    this.key = undefined;
    this.binaryTxt = undefined;
    this.encryptedTxt = undefined;
    
    
  }

  str_to_bin = (string) => {
    let binary = "";
   
    binary = string.split('').map(char => {
      return char.charCodeAt(0).toString(2);
    }).join(' ');
   
    return binary;
  };

  key_gen = () => {
    let key = "";
    for (let i = 0; i < this.txt.length; i++) {
        key += latin_alphabet[Math.floor(Math.random()*latin_alphabet["length"])]
    }
    
    
    this.key = this.str_to_bin(key);
    
  };

  encrypt = (string) =>{
    this.txt = string;
    this.binaryTxt = this.str_to_bin(this.txt);
    this.key_gen();
    
    this.encryptedTxt = this.xor(this.binaryTxt, this.key);
  }

  decrypt = () =>{
    let encrypted_join = this.encryptedTxt.join(" ")
    
    let decrypted = this.xor(encrypted_join, this.key);
    
  
    //Map every binary char to real char, primero pasa de int binario y luego a char,
    const outputStr = decrypted.map(bin => (String.fromCharCode(parseInt(bin, 2))))
     
    

    return outputStr.join("")
    
  }

  xor = (a, b) => {
    a = a.split(" ")
    b = b.split(" ")
    let ans = ""
    
    for(let i=0; i < a.length; i++){
      for(let j=0; j<a[i].length; j++){
        a[i][j] == b[i][j] ? ans += "0" : ans += "1";
      }
      ans+= " "
    }

    ans = ans.split(" ");
    ans.pop();
    return ans
  }

  dump_key = () =>{
    fs.writeFile("otp_key.txt", this.key, (err) =>{
      if(err){
        console.error("Cannot create .txt:", err);
        exit(-1);
      }
    });
  }

  import_key = () =>{
    fs.readFile("otp_key.txt", (err, txt) =>{
      if(err){
        console.error("Cannot read .txt", err);
        exit(-1);
      }
      this.key = txt.toString();
    });
  }
}



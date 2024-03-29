import assert from 'assert';
import { green } from 'colors';
import { pbkdf2Sync } from 'crypto';
import {mulBy02, mulBy03, mulBy09, mulBy0b, mulBy0d, mulBy0e, leftShift, rightShift, addPad, removePad, xorMass, makeCounter} from '../helper/AESfunc'
import { fromUTF8, toUTF8 } from '../helper/binary';
import { BIGTEXTVAR1, TEXT1000VAR1 } from '../helper/globals';
import { num, str } from '../types.js';

const sBox = [
  0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
  0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0,
  0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
  0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75,
  0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84,
  0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
  0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8,
  0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2,
  0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
  0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb,
  0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,
  0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
  0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
  0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e,
  0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
  0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16,
];

const invSbox = [
  0x52, 0x09, 0x6A, 0xD5, 0x30, 0x36, 0xA5, 0x38, 0xBF, 0x40, 0xA3, 0x9E, 0x81, 0xF3, 0xD7, 0xFB,
  0x7C, 0xE3, 0x39, 0x82, 0x9B, 0x2F, 0xFF, 0x87, 0x34, 0x8E, 0x43, 0x44, 0xC4, 0xDE, 0xE9, 0xCB,
  0x54, 0x7B, 0x94, 0x32, 0xA6, 0xC2, 0x23, 0x3D, 0xEE, 0x4C, 0x95, 0x0B, 0x42, 0xFA, 0xC3, 0x4E,
  0x08, 0x2E, 0xA1, 0x66, 0x28, 0xD9, 0x24, 0xB2, 0x76, 0x5B, 0xA2, 0x49, 0x6D, 0x8B, 0xD1, 0x25,
  0x72, 0xF8, 0xF6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xD4, 0xA4, 0x5C, 0xCC, 0x5D, 0x65, 0xB6, 0x92,
  0x6C, 0x70, 0x48, 0x50, 0xFD, 0xED, 0xB9, 0xDA, 0x5E, 0x15, 0x46, 0x57, 0xA7, 0x8D, 0x9D, 0x84,
  0x90, 0xD8, 0xAB, 0x00, 0x8C, 0xBC, 0xD3, 0x0A, 0xF7, 0xE4, 0x58, 0x05, 0xB8, 0xB3, 0x45, 0x06,
  0xD0, 0x2C, 0x1E, 0x8F, 0xCA, 0x3F, 0x0F, 0x02, 0xC1, 0xAF, 0xBD, 0x03, 0x01, 0x13, 0x8A, 0x6B,
  0x3A, 0x91, 0x11, 0x41, 0x4F, 0x67, 0xDC, 0xEA, 0x97, 0xF2, 0xCF, 0xCE, 0xF0, 0xB4, 0xE6, 0x73,
  0x96, 0xAC, 0x74, 0x22, 0xE7, 0xAD, 0x35, 0x85, 0xE2, 0xF9, 0x37, 0xE8, 0x1C, 0x75, 0xDF, 0x6E,
  0x47, 0xF1, 0x1A, 0x71, 0x1D, 0x29, 0xC5, 0x89, 0x6F, 0xB7, 0x62, 0x0E, 0xAA, 0x18, 0xBE, 0x1B,
  0xFC, 0x56, 0x3E, 0x4B, 0xC6, 0xD2, 0x79, 0x20, 0x9A, 0xDB, 0xC0, 0xFE, 0x78, 0xCD, 0x5A, 0xF4,
  0x1F, 0xDD, 0xA8, 0x33, 0x88, 0x07, 0xC7, 0x31, 0xB1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xEC, 0x5F,
  0x60, 0x51, 0x7F, 0xA9, 0x19, 0xB5, 0x4A, 0x0D, 0x2D, 0xE5, 0x7A, 0x9F, 0x93, 0xC9, 0x9C, 0xEF,
  0xA0, 0xE0, 0x3B, 0x4D, 0xAE, 0x2A, 0xF5, 0xB0, 0xC8, 0xEB, 0xBB, 0x3C, 0x83, 0x53, 0x99, 0x61,
  0x17, 0x2B, 0x04, 0x7E, 0xBA, 0x77, 0xD6, 0x26, 0xE1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0C, 0x7D,
]
// rCon is Round Constant used for the Key Expansion [1st col is 2^(r-1) in GF(2^8)] [§5.2]
const rCon = [
  [ 0x00, 0x00, 0x00, 0x00 ],
  [ 0x01, 0x00, 0x00, 0x00 ],
  [ 0x02, 0x00, 0x00, 0x00 ],
  [ 0x04, 0x00, 0x00, 0x00 ],
  [ 0x08, 0x00, 0x00, 0x00 ],
  [ 0x10, 0x00, 0x00, 0x00 ],
  [ 0x20, 0x00, 0x00, 0x00 ],
  [ 0x40, 0x00, 0x00, 0x00 ],
  [ 0x80, 0x00, 0x00, 0x00 ],
  [ 0x1b, 0x00, 0x00, 0x00 ],
  [ 0x36, 0x00, 0x00, 0x00 ],
];

const subBytes = (s:num[][], Nb:num) => {
  for (let r of [...Array(Nb).keys()])
    for (let c=0; c<Nb; c++) s[r][c] = sBox[s[r][c]];
  return s;
}
const invSubBytes = (s:num[][], Nb:num) => {
  for (let r of [...Array(Nb).keys()])
    for (let c=0; c<Nb; c++) s[r][c] = invSbox[s[r][c]];
  return s;
}

const shiftRows = (s:num[][], Nb:num) => {
  const t = new Array(4);
  for (let r=1; r<4; r++) {
    s[r] = leftShift(s[r],r)
  }
  return s;  
}
const invShiftRows = (s:num[][], Nb:num) => {
  const t = new Array(4);
  for (let r=1; r<4; r++) {
    s[r] = rightShift(s[r],r)
  }
  return s;  
}

const mixColumns = (s:num[][], Nb:num) =>{
  for(let i of [...Array(Nb).keys()]){
    const s0 = mulBy02(s[0][i])^mulBy03(s[1][i])^s[2][i]^s[3][i]
    const s1 = s[0][i]^mulBy02(s[1][i])^mulBy03(s[2][i])^s[3][i]
    const s2 = s[0][i]^s[1][i]^mulBy02(s[2][i])^mulBy03(s[3][i])
    const s3 = mulBy03(s[0][i])^s[1][i]^s[2][i]^mulBy02(s[3][i])
    s[0][i] = s0
    s[1][i] = s1
    s[2][i] = s2
    s[3][i] = s3
  }
  return s
}
const invMixColumns = (s:num[][], Nb:num) =>{
  for(let i of [...Array(Nb).keys()]){
    const s0 = mulBy0e(s[0][i])^mulBy0b(s[1][i])^mulBy0d(s[2][i])^mulBy09(s[3][i])
    const s1 = mulBy09(s[0][i])^mulBy0e(s[1][i])^mulBy0b(s[2][i])^mulBy0d(s[3][i])
    const s2 = mulBy0d(s[0][i])^mulBy09(s[1][i])^mulBy0e(s[2][i])^mulBy0b(s[3][i])
    const s3 = mulBy0b(s[0][i])^mulBy0d(s[1][i])^mulBy09(s[2][i])^mulBy0e(s[3][i])
    s[0][i] = s0
    s[1][i] = s1
    s[2][i] = s2
    s[3][i] = s3
  }
  return s
}

const addRoundKey = (s:num[][], w:num[][], rnd:num, Nb:num) => {
  for (let r of [...Array(Nb).keys()]) {
      for (let c=0; c<Nb; c++) s[r][c] ^= w[rnd*4+c][r];
  }
  return s;
}

const subWord = (w:num[]) => {
  for (let i of [...Array(4).keys()]) w[i] = sBox[w[i]];
  return w;
}

const rotWord = (w:num[]) => {
  const tmp = w[0];
  for (let i of [...Array(3).keys()]) w[i] = w[i+1];
  w[3] = tmp;
  return w;
}

const keyExpansion = (key:num[]) => {
  const Nb = 4;            // block size (in words): no of columns in state (fixed at 4 for AES)
  const Nk = key.length/4; // key length (in words): 4/6/8 for 128/192/256-bit keys
  const Nr = Nk + 6;       // no of rounds: 10/12/14 for 128/192/256-bit keys

  const w = new Array(Nb*(Nr+1));
  let temp = new Array(4);

  // initialise first Nk words of expanded key with cipher key
  for (let i of [...Array(Nk).keys()]) {
      const r = [ key[4*i], key[4*i+1], key[4*i+2], key[4*i+3] ];
      w[i] = r;
  }

  // expand the key into the remainder of the schedule
  for (let i=Nk; i<(Nb*(Nr+1)); i++) {
      w[i] = new Array(4);
      for (let t of [...Array(4).keys()]) temp[t] = w[i-1][t];
      // each Nk'th word has extra transformation
      if (i % Nk == 0) {
          temp = subWord(rotWord(temp));
          for (let t of [...Array(4).keys()]) temp[t] ^= rCon[i/Nk][t];
      }
      // 256-bit key has subWord applied every 4th word
      else if (Nk > 6 && i%Nk == 4) {
          temp = subWord(temp);
      }
      // xor w[i] with w[i-1] and w[i-Nk]
      for (let t of [...Array(4).keys()]) w[i][t] = w[i-Nk][t] ^ temp[t];
  }

  return w;
}

const encryptBlock = (input:num[], w:num[][]):num[] => {
  const Nb = 4;               // block size (in words): no of columns in state (fixed at 4 for AES)
  const Nr = w.length/Nb - 1; // no of rounds: 10/12/14 for 128/192/256-bit keys

  let state:num[][] = [ [], [], [], [] ];  // initialise 4×Nb byte-array 'state' with input [§3.4]
  for (let i=0; i<4*Nb; i++) state[i%4][Math.floor(i/4)] = input[i];

  state = addRoundKey(state, w, 0, Nb);

  for (let round=1; round<Nr; round++) {
      state = subBytes(state, Nb);
      state = shiftRows(state, Nb);
      state = mixColumns(state, Nb);
      state = addRoundKey(state, w, round, Nb);
  }

  state = subBytes(state, Nb);
  state = shiftRows(state, Nb);
  state = addRoundKey(state, w, Nr, Nb);

  const output = new Array(4*Nb);  // convert state to 1-d array before returning [§3.4]
  for (let i=0; i<4*Nb; i++) output[i] = state[i%4][Math.floor(i/4)];

  return output;
}

const decryptBlock = (input:num[], w:num[][]) =>{
  const Nb = 4;               // block size (in words): no of columns in state (fixed at 4 for AES)
  const Nr = w.length/Nb - 1; // no of rounds: 10/12/14 for 128/192/256-bit keys

  let state:num[][] = [ [], [], [], [] ];  // initialise 4×Nb byte-array 'state' with input [§3.4]
  for (let i=0; i<4*Nb; i++) state[i%4][Math.floor(i/4)] = input[i];
  let round=Nr-1

  state = addRoundKey(state, w, Nr, Nb);

  while(round >= 1) {
    state = invShiftRows(state, Nb); 
    state = invSubBytes(state, Nb);
    state = addRoundKey(state, w, round, Nb);
    state = invMixColumns(state, Nb);
    --round
  }
  state = invSubBytes(state, Nb);
  state = invShiftRows(state, Nb);
  state = addRoundKey(state, w, 0, Nb);

  const output = new Array(4*Nb);  // convert state to 1-d array before returning [§3.4]
  for (let i=0; i<4*Nb; i++) output[i] = state[i%4][Math.floor(i/4)];

  return output;
}

const encryptCBC = (input:num[],password:num[],iv:num[]) =>{
  assert.deepEqual(iv.length,16)

  input = addPad(input)

  let cryptoBlocks:num[][] = []
  let prev:num[] = iv

  const plainBlocks:num[][] = Array(Math.ceil(input.length/16)).fill(input).map((item,i) =>{return input.slice(i*16, i * 16 + 16)})

  const key = keyExpansion(password)

  for (let block of plainBlocks){
    cryptoBlocks.push(encryptBlock(xorMass(block, prev),key))
    prev = block
  }
    
  return cryptoBlocks.reduce((a,b) =>{return [...a,...b]})
}

const decryptCBC = (input:num[],password:num[],iv:num[]) =>{
  assert.deepEqual(iv.length,16)

  let cryptoBlocks:num[][] = []
  let prev:num[] = iv

  const plainBlocks:num[][] = Array(Math.ceil(input.length/16)).fill(input).map((item,i) =>{return input.slice(i*16, i * 16 + 16)})

  const key = keyExpansion(password)

  for (let block of plainBlocks){
    cryptoBlocks.push(xorMass(decryptBlock(block, key),prev))
    prev = xorMass(decryptBlock(block, key),prev)
  }
    
  return cryptoBlocks.reduce((a,b) =>{return [...a,...b]})
}

const encryptCTR = (input:num[], password:num[], counter:num[][]) =>{
  input = addPad(input)

  let cryptoBlocks:num[][] = []
  
  const plainBlocks:num[][] = Array(Math.ceil(input.length/16)).fill(input).map((item,i) =>{return input.slice(i*16, i * 16 + 16)})

  const key = keyExpansion(password)

  plainBlocks.forEach((block, index) =>{
    cryptoBlocks.push(xorMass(block, encryptBlock(counter[index],key)))
  })

  return cryptoBlocks.reduce((a,b) =>{return [...a,...b]})
}

const decryptCTR = (input:num[],password:num[], counter:num[][]) =>{
  let cryptoBlocks:num[][] = []

  const plainBlocks:num[][] = Array(Math.ceil(input.length/16)).fill(input).map((item,i) =>{return input.slice(i*16, i * 16 + 16)})

  const key = keyExpansion(password)

  plainBlocks.forEach((block, index) =>{
    cryptoBlocks.push(xorMass(block, encryptBlock(counter[index],key)))
  })

  return cryptoBlocks.reduce((a,b) =>{return [...a,...b]})
}

const enc = (plainText:str, key:str, mode:'CBC'|'CTR') =>{
  const utfText = toUTF8(plainText)
  const keyBuf = Array.from(pbkdf2Sync(key,'salt',10000,32,'sha256')).splice(0,16)
  const cnt = utfText.length

  let cipher

  switch (mode) {
    case 'CBC':
      const iv = Array.from(pbkdf2Sync(key,'salt',10000,32,'sha256')).splice(16,32)

      cipher = encryptCBC(utfText,keyBuf,iv).map(item => item.toString(16))
    break;
  
    case 'CTR':
      const firstPartOfCounter = Array.from(pbkdf2Sync(key,'salt',10000,32,'sha256')).splice(16,24)

      let counter = makeCounter(cnt)

      counter = counter.map(block =>{
        return firstPartOfCounter.concat(block)
      })

      cipher = encryptCTR(utfText,keyBuf,counter).map(item => item.toString(16))
    break;
  }

  return cipher
}

const dec = (cryptoMassive:str[],key:str, mode:'CBC'|'CTR') =>{
  const numText:num[] = cryptoMassive.map(i => parseInt(i,16))
  const keyBuf = Array.from(pbkdf2Sync(key,'salt',10000,32,'sha256')).splice(0,16)
  const cnt = numText.length

  let plainText

  switch (mode) {
    case 'CBC':
      const iv = Array.from(pbkdf2Sync(key,'salt',10000,32,'sha256')).splice(16,32)
      plainText = decryptCBC(numText,keyBuf,iv)
    break;
  
    case 'CTR':
      const firstPartOfCounter = Array.from(pbkdf2Sync(key,'salt',10000,32,'sha256')).splice(16,24)

      let counter = makeCounter(cnt)

      counter = counter.map(block =>{
        return firstPartOfCounter.concat(block)
      })

      plainText = decryptCTR(numText,keyBuf, counter)
    break;
  }

  

  return fromUTF8(removePad(plainText))
}



const Main = (text:str, text1000:str, key:str) =>{
  const plainBlock = [0x00,0x11,0x22,0x33,0x44,0x55,0x66,0x77,0x88,0x99,0xAA,0xBB,0xCC,0xDD,0xEE,0xFF]
  const blockKey = [0x00,0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x08,0x09,0x0a,0x0b,0x0c,0x0d,0x0e,0x0f]

  const standartResult = encryptBlock(plainBlock,keyExpansion(blockKey))
  console.log(green(`Шифрование блока по стандарту: ${standartResult.map(i =>{return i.toString(16)}).join('')}`))
  const standartDecrypt = decryptBlock(standartResult,keyExpansion(blockKey))
  console.log(green(`Расшифрование блока по стандарту: ${standartDecrypt.map(i =>{return i.toString(16)}).join('')} \n`))



  const textResult = enc(text, key, "CBC")
  console.log(green(`Шифрование пословицы по варианту: ${textResult.join('')}`))
  const textDecrypt = dec(textResult,key, "CBC")
  console.log(green(`Расшифрование пословицы по варианту: ${textDecrypt} \n`))

  const text1000Result = enc(text1000, key, "CBC")
  console.log(green(`Шифрование текста на 1000 символов: ${text1000Result.join('')}`))
  const text1000Decrypt = dec(text1000Result,key, "CBC")
  console.log(green(`Расшифрование текста на 1000 символов: ${text1000Decrypt} \n \n`))



  const textCTRResult = enc(text, key, "CTR")
  console.log(green(`Шифрование пословицы по варианту: ${textCTRResult.join('')}`))
  const textCTRDecrypt = dec(textCTRResult,key, "CTR")
  console.log(green(`Расшифрование пословицы по варианту: ${textCTRDecrypt} \n`))

  const text1000CTRResult = enc(text1000, key, "CTR")
  console.log(green(`Шифрование текста на 1000 символов: ${text1000CTRResult.join('')}`))
  const text1000CTRDecrypt = dec(text1000CTRResult,key, "CTR")
  console.log(green(`Расшифрование текста на 1000 символов: ${text1000CTRDecrypt}`))
}

Main(BIGTEXTVAR1, TEXT1000VAR1, 'AyoMate')
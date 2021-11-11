const {gostCrypto, gostEngine} = require('node-gost-crypto')

export const magma_en = (text:string, key:string) =>{

  let textBuffer:Buffer = Buffer.from(text)
  

  gostCrypto.subtle.getChipher( )
}
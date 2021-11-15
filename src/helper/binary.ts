export const toBinary = (plain:string) =>{
  const encoder = new TextEncoder()
  const view = encoder.encode(plain)
  /* console.log(view) */
  let bytesTemp = []

  for (let i=0; i < view.length; i++) {
    let chunk = view[i].toString(2).split('')
    if (chunk.length < 8){
      while (chunk.length < 8){
        chunk.unshift("0")
      }
    }
    bytesTemp.push(chunk)
  }
  let bytes:any[] = bytesTemp.reduce((a,b) =>{
    return a.concat(b)
  })

  bytes.forEach((item,index) => {bytes[index] = Number(item)})

  return bytes
}

export const binToStr = (bits:any) =>{
  const decoder = new TextDecoder()
  let chunkSize = 8
  let chunk:any=''
  let massive = []

  for (let i = 0; i<bits.length; i += chunkSize){
    chunk = parseInt(bits.slice(i, i+chunkSize).toString(),2)
    massive.push(chunk)
  }

  let uMassive = Uint8Array.from(massive)
  /* console.log(uMassive) */
  return decoder.decode(uMassive)
}
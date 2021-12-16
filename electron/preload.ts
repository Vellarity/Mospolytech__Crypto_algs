import { contextBridge, ipcRenderer } from "electron";
import { str } from "types";

contextBridge.exposeInMainWorld(
  "enc", {
    A5_1SH: (text:str,key:str) =>{return ipcRenderer.invoke('A5_1-chipher', text, key)},
    A5_1DE: (text:str,key:str) =>{return ipcRenderer.invoke('A5_1-dechipher', text, key)},

    AESSH: (text:str,key:str) =>{return ipcRenderer.invoke('AES-chipher', text, key)},
    AESDE: (text:str,key:str) =>{return ipcRenderer.invoke('AES-dechipher', text, key)},

    ElGamalSH: (text:str, p:str, x:str, g:str) =>{return ipcRenderer.invoke('ElGamal-chipher', text, p, x, g)},
    ElGamalDE: (text:str, p:str, x:str, g:str) =>{return ipcRenderer.invoke('ElGamal-dechipher', text, p, x, g)},

    ElGamalECP: (text:str, P:str, G:str, X:str) =>{return ipcRenderer.invoke('ElGamal-ECP', text, P, G, X)},

    GOST_R_34_10_94: (text:str, P:str, Q:str, A:str, X:str) =>{return ipcRenderer.invoke('GOST_R_34_10_94-ECP', text, P, Q, A, X)},

    RSASH: (text:str, P:str, Q:str, E:str) => {return ipcRenderer.invoke('RSA-chipher', text, P, Q, E)},
    RSADE: (text:str, P:str, Q:str, E:str) => {return ipcRenderer.invoke('RSA-dechipher', text, P, Q, E)},

    RSAECP: (text:str, P:str, Q:str, E:str) =>{return ipcRenderer.invoke('RSA-ECP', text, P, Q, E)}
  }
)
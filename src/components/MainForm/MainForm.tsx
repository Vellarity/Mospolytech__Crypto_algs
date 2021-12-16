import React, { useEffect, useState } from "react";
import { str } from "types";
import './MainForm.css'

type MainFormProps = {
  alphabet?: boolean,
  addInfo?:boolean,
  name?: str,
  keys: str[]
}

export const MainForm: React.FC<MainFormProps> = ({alphabet, addInfo, name, keys}) =>{
  const [key,setKey] = useState<any>()

  useEffect(() =>{
    initializeKeys(keys)
  }, [])

  const initializeKeys = (keys:any[]) =>{
    if (keys.length === 1){
      setKey('')
    }
    else{
      let template:any = {};
      keys.forEach(item => {template[item] = item}) 
      console.log(template)
    }
  }


  const handleKey = (key:str) =>{
    
  }

  return(
    <div className="MainWindow">
      <div className="InpOut">
        <textarea placeholder='Введите сообщение здесь...'></textarea>
        <textarea placeholder='Результат работы приложения...' readOnly></textarea>
      </div>
      <div className="PartialEncDec">
        <div className="InnerPartial">

          <div>
            {keys.map(item =>{
              return <input type='text' placeholder={item} onChange={(event) =>{handleKey(event.target.value)}}/>
            })}
          </div>

          {addInfo ? <textarea placeholder='Дополнительные данные' readOnly></textarea> : null}

        </div>

        <div className="EncDecBut">

          <button>Зашифровать</button>
          <button>Расшифровать</button>
          <span>{name}</span>

        </div>
      </div>
    </div>
  )
}
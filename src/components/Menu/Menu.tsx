import React, { FC } from "react";
import { Link } from "react-router-dom";
import { str } from "types";
import './Menu.css'

type MenuItemType = {
  name: str
}

const MenuItem: React.FC<MenuItemType> = ({name}) =>{
  return(
    <Link to={`/${name}`} className='MenuItem'>
      <span className='MenuItemName'>{name}</span>
    </Link>
  )
}

export const Menu = () =>{
  const list = ['A5_1','AES','Diffie-Hellman','ElGamal','ElGamalECP','GOST_R_34_10_94','RSA','RSAECP']
  return(
    <div className='block'>
      {list.map(item =>{
        return <MenuItem name={item}/>
      })}
    </div>
  )
}
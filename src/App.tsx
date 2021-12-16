import React from 'react';
import './App.css';
import { MainForm } from 'components/MainForm/MainForm';
import { Menu } from 'components/Menu/Menu';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='MainView'>
      <Menu />
      <Routes>
        <Route path='/A5_1' element={<MainForm name='A5_1' keys={['Ключ в двоичном виде']}/>}/>
        <Route path='/AES' element={<MainForm name='AES' keys={['Ключевое слово']}/>}/>
        <Route path='/Diffie-Hellman' element={<MainForm name='Diffie-Hellman' keys={['Ключевое слово']}/>}/>
        <Route path='/ElGamal' element={<MainForm name='ElGamal' keys={['p', 'x', 'g']} addInfo/>}/>
        <Route path='/ElGamalECP' element={<MainForm name='ElGamalECP' keys={['P', 'G', 'X']}/>}/>
        <Route path='/GOST_R_34_10_94' element={<MainForm name='GOST_R_34_10_94' keys={['P', 'Q', 'A', 'X']}/>}/>
        <Route path='/RSA' element={<MainForm name='RSA' keys={['P', 'Q', 'E']}/>}/>
        <Route path='/RSAECP' element={<MainForm name='RSAECP' keys={['P', 'Q', 'E']}/>}/>
      </Routes>
    </div>
  );
}

export default App;

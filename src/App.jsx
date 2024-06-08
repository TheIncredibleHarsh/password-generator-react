import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Slider from 'react-input-slider';

function App() {
  const [useSymbols, setUseSymbols] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [passwordLength, setPasswordLength] = useState(20);

  const passwordBox = useRef();

  const regeneratePassword = () => {
    let scope = "abcdefghijklmnopqrstuvwxyz";
    let symbols = "!@#$%^&*()_+=-[]{}:\"|;'\\<>?,./~`";
    let numbers = "1234567890";

    if(useSymbols == true){
      scope += symbols;
    }

    if(useNumbers == true){
      scope += numbers;
    }

    let password = ""
    for(let i = 0; i < passwordLength; i++){
      password += scope.charAt(Math.random() * scope.length);
    }

    passwordBox.current.value = password;
  }

  const copyPassword = () => {
    window.navigator.clipboard.writeText(passwordBox.current.value);
    passwordBox.current.select()
  }

  useEffect(() => {
    regeneratePassword();
  });

  return (
    <div className='bg-purple-600 h-screen w-screen flex justify-center'>
      <div className='bg-gray-300 h-64 rounded-3xl relative top-28 flex items-center justify-center flex-col p-10'>
        <div className='flex space-x-2'>
          <input className="bg-gray-400 rounded-lg text-slate-100 p-3 w-96" type="text" ref={passwordBox}/>
          <input className="bg-green-700 rounded-lg p-3 hover:bg-green-500 active:bg-green-900 text-gray-300" type='button' value={"Copy"} onClick={()=>copyPassword()} />
          <input className="bg-purple-600 rounded-lg p-3 hover:bg-purple-500 active:bg-purple-700 text-gray-300" type='button' value={"Regenerate"} onClick={()=>regeneratePassword()} />
        </div>
        <div className='flex flex-row p-5 space-x-32'>
          <div>
            <Slider axis="x" xmin={8} xmax={50} x={passwordLength} onChange={(x) => setPasswordLength(x.x)}/>
            <span className='p-3'>{passwordLength}</span>
          </div>
          <div className='flex flex-row'>
            <div><input type='checkbox' id='checkNumbers' checked={useNumbers} onChange={() => setUseNumbers(!useNumbers)}/><label htmlFor='checkNumbers'><span className='p-2'>Numbers</span></label>  </div>
            <div><input type='checkbox' id='checkSymbols' checked={useSymbols} onChange={() => setUseSymbols(!useSymbols)}/><label htmlFor='checkSymbols'><span className='p-2'>Symbols</span></label>  </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

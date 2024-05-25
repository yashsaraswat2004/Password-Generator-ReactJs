import { useState, useCallback, useEffect, useRef } from "react"


const App = () => {
  const [length, setLength] = useState(8)
  const [numAllowed, setnumAllowed] = useState(false)
  const [spCharAllowed, setspCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllowed) str+="0123456789"
    if(spCharAllowed) str+="{}[]|+=-_)(*&^%$#@!~"

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length+1)
      password+=str.charAt(char)
    }
    setPassword(password)
  },[length, numAllowed, spCharAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=> {
    passwordGenerator()
  },[length,numAllowed,spCharAllowed,passwordGenerator])
  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-center text-white text-3xl">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" 
        className="outline-none w-full py-1 px-3 mt-10"
        placeholder="Password"
        value={password}
        readOnly/>
        <button className="outline-none px-3 py-0.5 shrink-0 text-white bg-orange-600 mt-10">Copy</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input 
          type="range" 
          min={4} 
          max={16} 
          value={length}  
          
          className="cursor-pointer m-2 items-center" 
          onChange={(e) => {setLength(e.target.value)}}/>
          <label htmlFor="">Length {length}</label>
        </div>
        <div className="flex items-center gap-x-1 ml-5">
          <input type="checkbox"
            defaultChecked={numAllowed}
            id="numberInput"
            onChange={() => setnumAllowed((prev) => {!prev})}/>
            <label htmlFor="">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1 w-10 ml-5">
          <input type="checkbox"
            defaultChecked={spCharAllowed}
            id="spCharInput"
            onChange={() => setspCharAllowed((prev) => {!prev})}/>
            <label htmlFor="">Symbols</label>
        </div>
      </div>
    </div>
  )
}

export default App
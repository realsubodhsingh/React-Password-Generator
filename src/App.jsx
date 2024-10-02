import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  // gonna to write the logic for the password generator

  const [length, setLength] = useState(8);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]); //remember i said the dependencies in callback function passes in the form of array.

  
  const copyPasswordtoClipboard = useCallback(() => {
    passwordRef.current?.select(); // just for optimization
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // useeffect
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-700 bg-gray-100 h-60 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-black text-center font-semibold font-sans text-2xl p-5">
          Password Generator
        </h1>
        <div className="flex shadow-lg rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef} // for useRef
          />
          <button
            onClick={copyPasswordtoClipboard}
            className="rounded-sm px-3 py-1 shrink-0 bg-blue-700 text-white"
          >
            copy
          </button>
        </div>

        <div className="flex text-sm gap-x-3">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={10}
              max={99}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-3">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setnumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setcharAllowed((prev) => !prev); // call-back firing for vice-versa thing
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

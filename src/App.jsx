import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  let [length, setlength] = useState(8);
  let [numberAllowed, setnumberAllowed] = useState(false);
  let [charAllowed, setcharAllowed] = useState(false);
  let [password, setpasswordAllowed] = useState("");
  //useRef hook
  let passwordRef = useRef(null);

  // usestate hook
  let passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+=-{}[]|:;<>,.?/~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);

      setpasswordAllowed(pass);
    }
  }, [length, numberAllowed, charAllowed, setpasswordAllowed]);

  // useRef hook
  let copypassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // useEffect hook
  useEffect(() => {
    passwordGenerator();
  }, [length, setcharAllowed, setnumberAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-[40rem] rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3 text-2xl">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            placeholder="Password"
            className="outline-none w-full py-2 px-3 rounded-lg"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copypassword}
            className="mx-2 text-blue-400 font-medium"
          >
            Copy
          </button>
        </div>
        {/* sec main div */}
        <div className="flex text-sm gap-x-2 justify-evenly">
          <div className="flex items-center gap-x-4">
            <input
              type="range"
              value={length}
              min={8}
              max={100}
              className="cursor-pointer"
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label htmlFor="length">Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-2">
            <label htmlFor="numberAllowed">Number</label>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setnumberAllowed((prev) => !prev);
              }}
            />
          </div>

          <div className="flex items-center gap-x-2">
            <label htmlFor="charAllowed">character</label>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setcharAllowed((prev) => !prev);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

import "./App.css";
import { useCallback,useRef,useState,useEffect } from "react";

function App() {
  const [len, setLen] = useState(8);
  const [num, setNum] = useState(false);
  const [sym, setSym] = useState(false);
  const [password, setPassword] = useState("");

  
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (num) str += "0123456789";
    if (sym) str += "!@#$%^&*_+`-?~₹";

    for (let i = 1; i <= len; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [len, num, sym, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator();
  }, [len,num,sym,passwordGenerator])
  

  return (
    <>
      <div className="conatiner">

        <h2 className="headi">Random Password Generator</h2>
        <div className="inputDiv">
          <input
            className="passInput"
            type="text"
            name="randomText"
            id="randomText"
            value={password}
            readOnly
            ref={passwordRef}
          />
          <button className="copyBtn" onClick={copyPasswordToClipboard}> copy</button>
        </div>
      <div className="mBtn">
        <div className="range">
          <input
            className="iRange"
            type="range"
            min={4}
            max={100}
            value={len}
            onChange={(e) => {
              setLen(e.target.value);
            }}
            />
            {/* <input type="range" name="" id="" /> */}
          <label> Length: {len} </label>
        </div>

          <input type="checkbox" name="num" id="num" defaultChecked={num} onChange={() => {
              setNum((prev) => !prev);
          }}/>
          <label htmlFor="num">Number</label>


          <input type="checkbox" name="sym" id="sym" defaultChecked={sym} onChange={() => {
              setSym((prev) => !prev);
          }} />
          <label htmlFor="sym"> Symbol</label>

      </div>
            </div>
    </>
  );
}

export default App;

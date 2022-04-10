import { useEffect, useState } from "react";
import Money from "./Money";

function App(){
  const [loading, setLoading] = useState(true);
  const [moneys, setMoneys] = useState([]);
  const [amount, setAmount] = useState(0);

  useEffect( () => {
      fetch(`http://api.currencylayer.com/live?access_key=cacc01bd9144e3546bed9bf5e74cb390&format=1`)
      .then((response) => response.json())
      .then((json) => { 
          setMoneys(json)
          setLoading(false)
      })
    } ,[])
  
  const onChange = (e) => {
    setAmount(e.target.value);
  }
  const reset= () => setAmount(0);

  return (
      <div>
        <h1> 코인? 얼마면 돼? </h1>
        <hr />
        <div>
            <label htmlFor="won">가진 금액(원):</label>
            <input value={amount} id="won" placeholder="WON" type="number" onChange={onChange}  />
        </div>
        <div>
            <label htmlFor="dollor">USD:</label>
            <input defaultValue={ loading ? "" : amount / moneys.quotes.USDKRW} id="dollor" placeholder="USD" type="text" />
            <button onClick={reset}>Reset</button>
        </div>
        
        <Money won={amount} moneys={moneys} />
      </div>

      
  )
}
export default App;
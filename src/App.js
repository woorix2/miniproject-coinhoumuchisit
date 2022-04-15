import { useEffect, useState } from "react";
import Money from "./Money";
import style from './App.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBitcoinSign } from "@fortawesome/free-solid-svg-icons";

function App(){
  const [loading, setLoading] = useState(true);
  const [moneys, setMoneys] = useState([]);
  const [amount, setAmount] = useState('');

  useEffect( () => {
      fetch(`http://api.currencylayer.com/live?access_key=cacc01bd9144e3546bed9bf5e74cb390&format=1`)
      .then((response) => response.json())
      .then((json) => { 
          setMoneys(json)
          setLoading(false)
      })
    } ,[])
  
  const onChange = (e) => {
    const value = e.target.value;
    const removedCommaValue = Number(value.replaceAll(",", ""));
    setAmount(removedCommaValue.toLocaleString());
  }
  const reset= () => setAmount('');
  
  const removeComma = parseInt(amount.replace(/,/g , ''));

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.header}>
        <FontAwesomeIcon icon={ faBitcoinSign } className={style.icon}/>
        <h1 className={style.title}> 코인? 얼마면 돼? </h1>
        <p className={style.des}>가진 돈을 달러로 환산해 원하는 코인을 몇 개나 살 수 있는지 알아보세요!</p>
        </div>
        <div className={style.firstContent}>
          <div className={style.inputBox1}>
              <label htmlFor="won">금액(원):</label>
              <input className={`${style.input} ${style.priceInput}`} value={amount} id="won" placeholder="WON" type="text" onChange={onChange} />
          </div>
          <div className={style.inputBox1}>
              <label htmlFor="dollor">USD:</label>
              <input className={`${style.input} ${style.usdInput}`} defaultValue={ loading ? "" : 
              (amount === '') ? "" : removeComma / moneys.quotes.USDKRW} 
              id="dollor" placeholder="USD" type="text"/>
          </div>
          <button className={style.btn} onClick={reset}>Reset</button>
        </div>
        
        <Money won={removeComma} moneys={moneys} />
      </div>
    </div>
  )
}
export default App;
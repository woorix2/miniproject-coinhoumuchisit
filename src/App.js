import React, { useEffect, useState, useRef } from "react";
import Money from "./Money";
import style from "./App.module.css";
import Coin from "./coin.png";

function App() {
  const [loading, setLoading] = useState(true);
  const [moneys, setMoneys] = useState([]);
  const [amount, setAmount] = useState("");
  const [usd, setUsd] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    fetch(
      `http://api.currencylayer.com/live?access_key=cacc01bd9144e3546bed9bf5e74cb390&format=1`
    )
      .then((response) => response.json())
      .then((json) => {
        setMoneys(json);
        setLoading(false);
        inputRef.current.focus();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getWon = (e) => {
    const value = e.target.value;
    const removedCommaValue = Number(value.replaceAll(",", ""));
    setTimeout(setAmount(removedCommaValue.toLocaleString()), 1000);
  };
  const reset = () => {
    setAmount("");
    setUsd("");
    inputRef.current.focus();
  };

  const removeComma = parseInt(amount.replace(/,/g, ""));

  const getUSD = () => {
    setUsd(
      loading ? "" : amount === "" ? "" : removeComma / moneys.quotes.USDKRW
    );
  };

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.header}>
          <img src={Coin} alt="로고이미지" className={style.icon} />
          <h1 className={style.title}> 코인? 얼마면 돼? </h1>
          <p className={style.des}>
            가진 돈을 달러로 환산해 원하는 코인을 몇 개나 살 수 있는지
            알아보세요!
          </p>
        </div>
        <div className={style.firstContent}>
          <div className={style.inputBox1}>
            <label htmlFor="won">금액(원):</label>
            <input
              ref={inputRef}
              className={`${style.input} ${style.priceInput}`}
              value={amount}
              id="won"
              placeholder="WON"
              type="text"
              onChange={getWon}
            />
          </div>
          <div className={style.inputBox1}>
            <label htmlFor="dollor">USD:</label>
            <input
              className={`${style.input} ${style.usdInput}`}
              defaultValue={usd}
              id="dollor"
              placeholder="USD"
              type="text"
              readOnly
            />
          </div>
          <button className={style.btn} onClick={getUSD}>
            Check
          </button>
          <button className={style.btn} onClick={reset}>
            Reset
          </button>
        </div>

        <Money amount={amount} won={removeComma} moneys={moneys} />
      </div>
    </div>
  );
}
export default App;

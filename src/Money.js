import React, { useState, useEffect } from "react";
import style from "./App.module.css";

// eslint-disable-next-line react/prop-types
const Money = ({ amount, won, moneys }) => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]); // 빈 배열을 초깃값으로 해서 undefined가 뜨지 않게 함.
  const [coinUsd, setCoinUsd] = useState(0);
  const [numCoin, setNumCoin] = useState("");

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=500")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
        console.log("fetch");
      });
  }, []);

  const getCoin = (e) => {
    setCoinUsd(e.target.value);
  };
  const onChangeNum = () => {
    // eslint-disable-next-line react/prop-types
    if (amount.length < 1) {
      alert("금액을 입력하세요");
    }
    // eslint-disable-next-line react/prop-types
    setNumCoin(won / moneys.quotes.USDKRW / coinUsd);
  };
  const reset = () => setNumCoin("");

  return (
    <div>
      <div className={style.secondContent}>
        <h3 className={style.subTitle}>
          {loading ? "" : `전체 ${coins.length}개의 코인`}
        </h3>
        <div className={style.inputBox}>
          {loading ? (
            <strong>Loading...</strong>
          ) : (
            <select className={style.select} onChange={getCoin}>
              <option defaultValue={numCoin === "" ? true : false}>
                코인을 선택하세요
              </option>
              {coins.map((coin) => (
                <option key={coin.id} value={coin.quotes.USD.price}>
                  {coin.name} ({coin.symbol}): {coin.quotes.USD.price}
                  USD
                </option>
              ))}
            </select>
          )}
        </div>
        <div className={style.inputBox}>
          <label htmlFor="numCoin">개수:</label>
          <input
            className={`${style.input} ${style.coinInput}`}
            id="numCoin"
            type="text"
            placeholder="과연 몇개 살 수 있을까?"
            value={numCoin}
            disabled
          />
          개
        </div>
        <button className={style.btn} onClick={onChangeNum}>
          Check
        </button>
        <button className={style.btn} onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};
export default React.memo(Money);

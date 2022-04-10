import React, { useState, useEffect } from "react";
import style from './App.module.css';

function Money(props) {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]) // 빈 배열을 초깃값으로 해서 undefined가 뜨지 않게 함.
    const [coinUsd, setCoinUsd] = useState(0);
    const [numCoin, setNumCoin] = useState(0);
    useEffect( () => {
        fetch('https://api.coinpaprika.com/v1/tickers?limit=500')
        .then((response) => response.json())
        .then((json) => { 
        setCoins(json)
        setLoading(false)
        })
    } ,[])

    const onChange = (e) => {
        setCoinUsd(e.target.value);
        console.log(e.target.value)
    }
    const onChangeNum = () => {
        setNumCoin(((props.won) / (props.moneys.quotes.USDKRW)) / (coinUsd));
    }
    console.log(props.won);
    
    console.log(coinUsd)
    return (
        <div>
            <div className={style.secondContent} >
                <h3 className={style.subTitle}>{ loading ? "" : `전체 ${coins.length}개의 코인`}</h3>
                <div className={style.inputBox}>
                {loading ? <strong>Loading...</strong> : 
                <select className={style.select}  onChange={onChange}>
                    <option>코인을 선택하세요</option>
                    {coins.map((coin) => 
                    <option key={coin.id} value={coin.quotes.USD.price}>
                        {coin.name} ({coin.symbol}): {coin.quotes.USD.price}
                        USD
                    </option>) }
                </select>}
                </div>
                <div className={style.inputBox}>
                    <label htmlFor="numCoin">살 수 있는 갯수:</label>
                    <input className={style.input} id="numCoin" type="text" placeholder="과연 몇개 살 수 있을까?" 
                    value={numCoin} disabled/>개
                    <button className={style.btn} onClick={onChangeNum}>조회</button>
                </div>
                
            </div>
        </div>
    ) 
}
export default Money;
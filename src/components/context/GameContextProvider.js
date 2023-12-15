import GameContext from "./GameContext";
import { useState, useEffect } from "react";

function GameContextProvider({children}){
    const [winCount, setWinCount] = useState(JSON.parse(localStorage.getItem('winCount')));
    const [tieCount, setTieCount] = useState(JSON.parse(localStorage.getItem('tieCount')));
    // // const [values, setValues] = useState(JSON.parse(localStorage.getItem('values')));
    // const [xPlayerTurn, setXPlayerTurn] = useState(JSON.parse(localStorage.getItem('xPlayerTurn')));
    // const [count, setCount] = useState(JSON.parse(localStorage.getItem('count')));

    useEffect(()=>{
      if(winCount !== null  && tieCount !== null){
        localStorage.setItem('winCount',JSON.parse(localStorage.getItem('winCount')));
        localStorage.setItem('tieCount',JSON.parse(localStorage.getItem('tieCount')));
      }
      },[])

      useEffect(()=>{
        if(winCount !==null  ){
          localStorage.setItem('winCount',winCount);
        }
        if(tieCount !==null  ){
        localStorage.setItem('tieCount',tieCount);
        }
        
      },[winCount,tieCount])

    return(
        <GameContext.Provider value={{ winCount, setWinCount, tieCount, setTieCount }}>
            {children}
        </GameContext.Provider>
    )
}
export default GameContextProvider;
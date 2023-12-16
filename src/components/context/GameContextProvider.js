import GameContext from "./GameContext";
import { useState,useEffect } from "react";

function GameContextProvider({ children }) {
  const [winCount, setWinCount] = useState(JSON.parse(localStorage.getItem('winCount')));
  const [tieCount, setTieCount] = useState(JSON.parse(localStorage.getItem('tie')));
  const [counter, setCounter] = useState(JSON.parse(localStorage.getItem('counter')));
  const [winStatus, setWinStatus] = useState(JSON.parse(localStorage.getItem('winStatus')));
  const [disableStatus, setDisableStatus] = useState(JSON.parse(localStorage.getItem('disableStatus')));
  const [oddPlayerTurn, setOddPlayerTurn] = useState(JSON.parse(localStorage.getItem('oddPlayerTurn')));
  //1st turn means true or 1 for
  const [values, setValues] = useState((JSON.parse(localStorage.getItem('values'))).value);

  useEffect(()=>{
    if(winCount === null  && tieCount === null){
      localStorage.setItem('values',JSON.stringify({value:["","","","","","","","",""]}))
      localStorage.setItem('disableStatus',false)
    }
    },[winCount, tieCount])


  return (
    <GameContext.Provider
      value={{
        winCount,
        setWinCount,
        tieCount,
        setTieCount,
        counter,
        setCounter,
        winStatus,
        setWinStatus,
        disableStatus, 
        setDisableStatus,
        oddPlayerTurn,
        setOddPlayerTurn,
        values,
        setValues,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
export default GameContextProvider;

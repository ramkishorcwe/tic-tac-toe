import GameContext from "./GameContext";
import { useState, useEffect } from "react";

function GameContextProvider({ children }) {
  const [winCount, setWinCount] = useState(
    JSON.parse(localStorage.getItem("winCount"))
  );
  const [tieCount, setTieCount] = useState(
    JSON.parse(localStorage.getItem("tie"))
  );
  const [counter, setCounter] = useState(
    JSON.parse(localStorage.getItem("counter"))
  );
  const [winStatus, setWinStatus] = useState(
    JSON.parse(localStorage.getItem("winStatus"))
  );
  const [disableStatus, setDisableStatus] = useState(
    JSON.parse(localStorage.getItem("disableStatus"))
  );
  const [oddPlayerTurn, setOddPlayerTurn] = useState(
    JSON.parse(localStorage.getItem("oddPlayerTurn"))
  ); //1st turn means true or 1 for
  const [clickedValueIndex, setClickedValueIndex] = useState(
    JSON.parse(localStorage.getItem("clickedValueIndex"))
  );
  const [values, setValues] = useState(
    JSON.parse(localStorage.getItem("values"))
  );
  const [redoValues, setRedoValues] = useState(
    JSON.parse(localStorage.getItem("redoValues"))
  );
  
  useEffect(() => { 
    if ((winCount === null && tieCount === null) || (winCount === 0 && tieCount === 0)) {
      localStorage.setItem(
        "values",
        JSON.stringify(["", "", "", "", "", "", "", "", ""])
      );
      localStorage.setItem("disableStatus", false);
      localStorage.setItem("winCount", 0);
      localStorage.setItem("tie", 0);
      localStorage.setItem("oddPlayerTurn", true);
      localStorage.setItem("disableStatus", false);
      localStorage.setItem("counter", 0);
      localStorage.setItem("winStatus", false);
      localStorage.setItem("values",JSON.stringify(["", "", "", "", "", "", "", "", ""]));
      localStorage.setItem("clickedValueIndex", JSON.stringify([]));
    } else {
      if(JSON.stringify(values)!==((localStorage.getItem('values')))){ //no need to parse
        localStorage.setItem('values',JSON.stringify(values));
      }
      if(JSON.stringify(redoValues)!==(localStorage.getItem('redoValues'))){
        localStorage.setItem('redoValues',JSON.stringify(redoValues));
      }
      if(JSON.stringify(clickedValueIndex)!==(localStorage.getItem('clickedValueIndex'))){
        localStorage.setItem('clickedValueIndex',JSON.stringify(clickedValueIndex));
      }
      if(JSON.stringify(oddPlayerTurn)!==(localStorage.getItem('clickedValueIndex'))){
        localStorage.setItem('oddPlayerTurn',JSON.stringify(oddPlayerTurn));
      }
      if(JSON.stringify(winStatus)!==(localStorage.getItem('winStatus'))){
        localStorage.setItem('winStatus',JSON.stringify(winStatus));
      }
      if(JSON.stringify(disableStatus)!==(localStorage.getItem('disableStatus'))){
        localStorage.setItem('disableStatus',JSON.stringify(disableStatus));
      }

      
    }
  }, [winCount, tieCount, redoValues, values, clickedValueIndex, oddPlayerTurn, winStatus, disableStatus]);

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
        clickedValueIndex,
        setClickedValueIndex,
        redoValues, 
        setRedoValues,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
export default GameContextProvider;

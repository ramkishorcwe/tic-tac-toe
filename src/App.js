import { useState, useEffect, useContext } from "react";
import "./App.css";
import Modal from "./components/Modal";
import GameContext from "./components/context/GameContext";

function App() {
  const [counter, setCounter] = useState(0);
  const [winStatus, setWinStatus] = useState(false);
  const [oddPlayerTurn, setOddPlayerTurn] = useState(true); //1st turn means true or 1 for
  const [values, setValues] = useState(["", "", "", "", "", "", "", "", ""]);
  // const [allStatus, setAllStatus ] = useState({winStatus:false,tieStatus:false,xPlayerTurn:true})
  const { winCount, setWinCount, tieCount, setTieCount } =
    useContext(GameContext);
  const winningCombination = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
    [3, 4, 5],
  ];
  const indexArray = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];

  function reset() {
    setValues(["", "", "", "", "", "", "", "", ""]);
    setCounter(0);
    setWinStatus(false);
    setOddPlayerTurn(true);
  }

  function checkWinningStatus(tempArray) {
    console.log("2", tempArray);
    for (const combination of winningCombination) {
      console.log("3", combination);
      if (
        tempArray[combination[0]] === tempArray[combination[1]] &&
        tempArray[combination[0]] === tempArray[combination[2]] &&
        tempArray[combination[0]] !== ""
      )
        return true;
    }
  }

  function onclickHandel(val) {
    let tempCount = 0;
    const tempArray = values.map((item, index) => {
      if (index === val) {
        if (oddPlayerTurn && values[val] === "") {
          item = "X";
          tempCount = counter + 1;
          setOddPlayerTurn((prev) => !prev);
          return item;
        } else if (values[val] === "") {
          item = "0";
          tempCount = counter + 1;
          setOddPlayerTurn((prev) => !prev);
          return item;
        } else {
          return item;
        }
      } else return item;
    });
    setValues(tempArray);
    setCounter(tempCount);
    if (checkWinningStatus(tempArray)) {
      //counter>3 && checkWinningStatus(tempArray)
      setWinStatus(true);
      setWinCount((prev) => prev + 1);
      // alert("win");
      // <Modal message={"win"}/>
      const localWinCount = JSON.parse(localStorage.getItem("winCount")) + 1;
      localStorage.setItem("winCount", localWinCount);
    } else if (tempCount >= 9) {
      setTieCount((prev) => prev + 1);
      // alert("no result");
      // const localTieCount = JSON.parse(localStorage.getItem("tie")) + 1;
      // localStorage.setItem("tie", localTieCount);
    } else {
      console.log("no");
    }
  }

  return (
    <div className="App">
      <div className="upper-buttons">
        <div>
          <span className="x"> X </span>
          <span className="o"> 0 </span>
        </div>
        <span className="turn">{oddPlayerTurn ? "X TURN" : "O TURN"}</span>
        <button className="reset-button turn" onClick={reset}>
          <i className="fa fa-refresh"></i>
        </button>
      </div>
      <div className="container-of-boxes">
        {indexArray.map((item) => (
          <div key={item} className="row">
            {item.map((index) => (
              <>
                <button
                  key={index}
                  style={{
                    color: values[index] === "X" ? "#30C1BC" : "#F2B236",
                  }}
                  className="box"
                  onClick={() => onclickHandel(index)}
                  disabled={winStatus}
                >
                  {values[index]}
                </button>{" "}
                <br />
              </>
            ))}
            <br />
          </div>
        ))}
        {/* {winStatus?<Modal message={"Win"}/>:(counter)} */}
        {(winStatus === true && (
          <Modal
            message={"Win"}
            resetButton={reset}
            winPlayer={oddPlayerTurn ? "0" : "X"}
          />
        )) ||
          (counter >= 9 && <Modal message={"Tie"} resetButton={reset} />)}
      </div>
      <div className="bottom">
        <span className="count">{`Total:${winCount+tieCount}`}</span>
        <span className="count">{winCount?`Win:${winCount}`:`Win:0`}</span>
        <span className="count">{tieCount?`Tie:${tieCount}`:`Tie:0`}</span>

      </div>
    </div>
  );
}

export default App;

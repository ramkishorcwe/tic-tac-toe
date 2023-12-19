import { useContext } from "react";
import "./App.css";
import Modal from "./components/Modal";
import GameContext from "./components/context/GameContext";

function App() {
  const {
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
  } = useContext(GameContext);

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
    setCounter(0);
    setWinStatus(false);
    setDisableStatus(false);
    setOddPlayerTurn(true); //false
    setValues(["", "", "", "", "", "", "", "", ""]);
    setClickedValueIndex([]);
    setRedoValues([]);
    localStorage.setItem("oddPlayerTurn", true);
    localStorage.setItem("counter", 0);
    localStorage.setItem("winStatus", false);
    localStorage.setItem("disableStatus", false);
    localStorage.setItem("values",JSON.stringify(["", "", "", "", "", "", "", "", ""] ));
    localStorage.setItem("clickedValueIndex", JSON.stringify([]));
  }

  function undoHandel() {
    if (counter > 0) {
      let tempValuesArray = values;
      const tempClickedValueIndex = clickedValueIndex;
      tempValuesArray = tempValuesArray.map((value, index) => {
        if (tempClickedValueIndex[counter - 1] === index) {
          tempClickedValueIndex.pop();
          // console.log({index:values[counter-1],value:(counter-1)});
          setRedoValues([...redoValues, {index:(counter-1),value:values[counter-1]}]);
          return "";
        } else return value;
      });
      // console.log("tempClickedValueIndex", tempClickedValueIndex);
      // console.log("tempValuesArray", tempValuesArray);
      setClickedValueIndex(tempClickedValueIndex); //pop last index from clickedValueIndex array
      setValues(tempValuesArray);                 //pop last value from values array
      setCounter((prev) => prev - 1);
      setOddPlayerTurn((prev) => !prev);
      localStorage.setItem("values", JSON.stringify(tempValuesArray));
      localStorage.setItem("clickedValueIndex",JSON.stringify(tempClickedValueIndex));
      localStorage.setItem("counter", counter - 1);
      localStorage.setItem("oddPlayerTurn", !oddPlayerTurn);
    } else {
      console.log("first move then undo only");
    }
  }

  function redoHandel() {

  }

  function checkWinningStatus(tempArray) {
    for (const combination of winningCombination) {
      if (
        tempArray[combination[0]] === tempArray[combination[1]] &&
        tempArray[combination[0]] === tempArray[combination[2]] &&
        tempArray[combination[0]] !== ""
      )
        return true; // if we return else then next 3 and more 3 has not checked
    }
  }

  function insertClickedValue(val) {
    let tempCount = 0;
    const tempArray = values.map((item, index) => {
      if (index === val) {
        if (oddPlayerTurn && values[val] === "") {
          item = "X";
          tempCount = counter + 1;
          setOddPlayerTurn((prev) => !prev);
          // localStorage.setItem("oddPlayerTurn", !oddPlayerTurn);
          return item;
        } else if (values[val] === "") {
          item = "0";
          tempCount = counter + 1;
          setOddPlayerTurn((prev) => !prev);
          // localStorage.setItem("oddPlayerTurn", !oddPlayerTurn);
          return item;
        } else {
          return item;
        }
      } else return item;
    });
    if (tempCount > 0) {
      console.log(clickedValueIndex);
      const tempClickedValueIndex = [...clickedValueIndex, val]
      setClickedValueIndex(tempClickedValueIndex);
      localStorage.setItem("clickedValueIndex",JSON.stringify(tempClickedValueIndex));
    }
    return {
      tempArray: tempArray,
      tempCount: tempCount,
    };
  }

  function onclickHandel(val) {
    const { tempArray, tempCount } = insertClickedValue(val);
    setValues(tempArray);
    setCounter(tempCount);
    localStorage.setItem("counter", tempCount);
    if (checkWinningStatus(tempArray)) {
      setWinStatus(true);
      setWinCount((prev) => prev + 1);
      // alert("win");
      const localWinCount = JSON.parse(localStorage.getItem("winCount")) + 1;  //*use win count in place of local storage
      localStorage.setItem("winCount", localWinCount);
      setDisableStatus(true);
    } else if (tempCount >= 9) {
      setTieCount((prev) => prev + 1);
      // alert("no result");
      const localTieCount = JSON.parse(localStorage.getItem("tie")) + 1;
      localStorage.setItem("tie", localTieCount);
      setDisableStatus(true);
    } else {
      console.log("no");
      //winStatus is false no need to set false or we can again set false
    }
  }

  return (
    <div className="App">
      <div className="upper-buttons">
        <button disabled={disableStatus} className="reset-button turn redo" onClick={redoHandel}>
          <i className="fa fa-redo-alt"></i>redo
        </button>
        <span className="turn">{oddPlayerTurn ? "X TURN" : "O TURN"}</span>
        <button disabled={disableStatus} className="reset-button turn" onClick={undoHandel}>
          <i className="fa fa-undo"></i>
        </button>
        <button  className="reset-button turn" onClick={reset}>
          <i className="fa fa-refresh"></i>
        </button>
      </div>
      <div className="container-of-boxes">
        {indexArray.map((item) => (
          <div key={item} className="row">
            {item.map((index) => (
              <div key={index}>
                <button
                  style={{
                    color: values[index] === "X" ? "#30C1BC" : "#F2B236",
                  }}
                  className="box"
                  onClick={() => onclickHandel(index)}
                  disabled={disableStatus}
                >
                  {values[index]}
                </button>{" "}
                <br />
              </div>
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
        <div>
          <span className="x"> X </span>
          <span className="o"> 0 </span>
        </div>
        <span className="count">{`Total:${winCount + tieCount}`}</span>
        <span className="count">{winCount ? `Win:${winCount}` : `Win:0`}</span>
        <span className="count">{tieCount ? `Tie:${tieCount}` : `Tie:0`}</span>
      </div>
    </div>
  );
}

export default App;

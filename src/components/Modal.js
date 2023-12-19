import "./Modal.css";
import { useState, useContext } from "react";
import GameContext from "./context/GameContext";

function Modal({ message, resetButton, winPlayer = "" }) {
  const [modalShow, setModalShow] = useState(true);
  const {
    setWinCount,
    setTieCount,
    setCounter,
    setWinStatus,
    setDisableStatus,
    setOddPlayerTurn,
    setValues,
    setClickedValueIndex,
    setRedoValues,
  } = useContext(GameContext);
  return (
    <>
      {modalShow && (
        <div className="container">
          <div className="modal">
            <p className="win-message">
              {winPlayer ? `${winPlayer} Player ${message}` : message}
            </p>
            <div className="modal-buttons">
              <button
                className="modal-button"
                onClick={() => {
                  setModalShow(false);
                  setCounter(0);
                  setWinStatus(false);
                  setDisableStatus(true);
                  setOddPlayerTurn(true); //false
                  setValues(["", "", "", "", "", "", "", "", ""]);
                  setClickedValueIndex([]);
                  setRedoValues([]);
                  setWinCount(0);
                  setTieCount(0);
                }}
              >
                Quit
              </button>
              <button className="modal-button" onClick={resetButton}>
                Next Round
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;

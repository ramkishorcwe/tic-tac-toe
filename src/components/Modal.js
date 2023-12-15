import "./Modal.css";
import { useState, useContext } from "react";
// import GameContext from "./context/GameContext";

function Modal({ message, resetButton, winPlayer='' }) {
  const [modalShow, setModalShow] = useState(true);
  // const {winCount, setWinCount, tieCount, setTieCount} = useContext(GameContext);
  return (
    <>
      {modalShow && (
        <div className="container">
          <div className="modal">
            <p>{winPlayer?(`${winPlayer} Player ${message}`):(message)}</p>
            <div className="modal-buttons">
              <button
                className="modal-button"
                onClick={() => {
                  setModalShow(false);
                  localStorage.removeItem('winCount')
                  localStorage.removeItem('tieCount')
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

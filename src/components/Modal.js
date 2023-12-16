import "./Modal.css";
import { useState } from "react";

function Modal({ message, resetButton, winPlayer = "" }) {
  const [modalShow, setModalShow] = useState(true);

  return (
    <>
      {modalShow && (
        <div className="container">
          <div className="modal">
            <p>{winPlayer ? `${winPlayer} Player ${message}` : message}</p>
            <div className="modal-buttons">
              <button
                className="modal-button"
                onClick={() => {
                  setModalShow(false);
                  localStorage.setItem("winCount", 0);
                  localStorage.setItem("tie", 0);
                  localStorage.setItem("oddPlayerTurn", true);
                  localStorage.setItem("disableStatus", false);
                  localStorage.setItem("counter", 0);
                  localStorage.setItem("winStatus", false);
                  localStorage.setItem(
                    "values",
                    JSON.stringify({
                      value: ["", "", "", "", "", "", "", "", ""],
                    })
                  );
                  window.close();
                }
              }
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

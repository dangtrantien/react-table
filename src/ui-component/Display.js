import PropTypes from "prop-types";
import { useRef, useState, useEffect } from "react";
import "../css/display.css";

// ==============================|| DISPLAY COLUMN ||============================== //

export default function Display({ headCell, showColumn }) {
  const wrapperRef = useRef(null);
  const [open, setOpen] = useState();

  const [columnID, setColumnID] = useState();
  const [check, setCheck] = useState(true);

  const handleClickOutside = (event) => {
    if (showColumn === true) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
  };

  const handleSwitch = (event, index) => {
    setColumnID(index);
    setCheck(event.target.check);

    if (event.target.check) {
      document.getElementById(index).classList.add("hide");
      document.getElementById(`body ${index}`).classList.add("hide");
    } else {
      document.getElementById(index).classList.remove("hide");
      document.getElementById(`body ${index}`).classList.remove("hide");
    }
  };

  const handleHideAll = () => {
    setCheck(false);

    [...document.getElementsByClassName("table-head")].map((data) => {
      data.classList.add("hide");
    });

    [...document.getElementsByClassName("table-body")].map((data) => {
      data.classList.add("hide");
    });
  };

  const handleShowAll = () => {
    setCheck(true);

    [...document.getElementsByClassName("table-head")].map((data) => {
      data.classList.remove("hide");
    });

    [...document.getElementsByClassName("table-body")].map((data) => {
      data.classList.remove("hide");
    });
  };

  useEffect(() => {
    setOpen(showColumn);

    // if (headCell) {
    //   headCell.map((data, index) => {
    //     if (document.getElementById(index).className === "hide") {
    //       setColumnID(index);
    //     }
    //   });
    // }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [headCell, showColumn]);

  return (
    <div
      ref={wrapperRef}
      className={open === true ? "container-show-column" : "hide"}
    >
      <form>
        <label htmlFor="fname">Find column</label>
        <input type="text" id="lname" name="lname" placeholder="Column title" />
      </form>

      <div className="container-switch">
        {headCell &&
          headCell.map((value, index) => (
            <div key={index}>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={check}
                  onChange={(e) => handleSwitch(e, index)}
                />
                <span className="slider round"></span>
              </label>

              <span>{value}</span>
            </div>
          ))}
      </div>

      <div className="action">
        <button onClick={handleHideAll}>HIDE All</button>
        <button onClick={handleShowAll}>SHOW ALL</button>
      </div>
    </div>
  );
}

Display.propTypes = {
  headCell: PropTypes.array,
  showColumn: PropTypes.bool,
};

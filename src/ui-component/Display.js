import PropTypes from "prop-types";
import { useRef, useState, useEffect } from "react";
import "../css/display.css";

// ==============================|| DISPLAY COLUMN ||============================== //

export default function Display({ headCell, showColumn }) {
  const wrapperRef = useRef(null);
  const [headCells, setHeadCells] = useState([]);

  const [open, setOpen] = useState();

  const [check, setCheck] = useState(true);

  const handleClickOutside = (event) => {
    if (showColumn === true) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
  };

  const handleChange = (event) => {
    let arr = [];

    if (event.target.value !== "") {
      headCells.map((data) => {
        if (data.includes(event.target.value.toLowerCase()) === true) {
          arr.push(data);
        }

        setHeadCells(arr);
      });
    } else {
      setHeadCells(headCell);
    }
  };

  const handleSwitch = (event, index) => {
    setCheck(event.target.check);

    if (event.target.classList.toggle("checked") === true) {
      document.getElementById(`thead-${index}`).classList.add("hide");
      document.getElementById(`tbody-${index}`).classList.add("hide");
    } else {
      document.getElementById(`thead-${index}`).classList.remove("hide");
      document.getElementById(`tbody-${index}`).classList.remove("hide");
    }
  };

  const handleHideAll = () => {
    setCheck(false);

    document.getElementById("table").classList.add("hide");
  };

  const handleShowAll = () => {
    setCheck(true);

    document.getElementById("table").classList.remove("hide");
  };

  useEffect(() => {
    setHeadCells(headCell);

    setOpen(showColumn);

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
        <input
          onChange={handleChange}
          type="text"
          id="lname"
          name="lname"
          placeholder="Column title"
        />
      </form>

      <div className="container-switch">
        {headCells.map((value, index) => (
          <div key={index}>
            <label className="switch">
              <input
                id={`display-${index}`}
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

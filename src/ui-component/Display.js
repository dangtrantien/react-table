import PropTypes from "prop-types";
import { useRef, useState, useEffect } from "react";
import "../css/display.css";

// ==============================|| DISPLAY COLUMN ||============================== //

export default function Display({ headColumns, bodyColumns, displayColumn }) {
  const wrapperRef = useRef(null);

  const [open, setOpen] = useState();

  const [list, setList] = useState({
    search: "",
    headColumn: [],
  });
  const [bodyColumn, setBodyColumn] = useState([]);

  const [check, setCheck] = useState(true);

  const handleClickOutside = (event) => {
    if (displayColumn === true) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
  };

  const handleChange = (event) => {
    const results = headColumns.filter((data) => {
      if (event.target.value === "") return data;
      return data.toLowerCase().includes(event.target.value.toLowerCase());
    });

    setList({
      search: event.target.value,
      headColumn: results,
    });
  };

  const handleSwitch = (event, index) => {
    setCheck(event.target.check);

    if (event.target.classList.toggle("checked") === true) {
      document.getElementById(`thead-${index}`).classList.add("hide");

      bodyColumn.map((_data, i) => {
        if (document.getElementsByClassName("tbody").item(i)) {
          document
            .getElementsByClassName("tbody")
            .item(i)
            .children.item(index)
            .classList.add("hide");
        }
      });
    } else {
      document.getElementById(`thead-${index}`).classList.remove("hide");

      bodyColumn.map((_data, i) => {
        if (document.getElementsByClassName("tbody").item(i)) {
          document
            .getElementsByClassName("tbody")
            .item(i)
            .children.item(index)
            .classList.remove("hide");
        }
      });
    }
  };

  const handleHideAll = () => {
    setCheck(false);

    list.headColumn.map((_data, index) => {
      document
        .getElementsByClassName("thead")
        .item(index)
        .classList.add("hide");

      bodyColumn.map((_data, i) => {
        if (document.getElementsByClassName("tbody").item(i)) {
          document
            .getElementsByClassName("tbody")
            .item(i)
            .children.item(index)
            .classList.add("hide");
        }
      });
    });
  };

  const handleShowAll = () => {
    setCheck(true);

    list.headColumn.map((_data, index) => {
      document
        .getElementsByClassName("thead")
        .item(index)
        .classList.remove("hide");

      bodyColumn.map((_data, i) => {
        if (document.getElementsByClassName("tbody").item(i)) {
          document
            .getElementsByClassName("tbody")
            .item(i)
            .children.item(index)
            .classList.remove("hide");
        }
      });
    });
  };

  useEffect(() => {
    setOpen(displayColumn);

    setList({ headColumn: headColumns });

    setBodyColumn(bodyColumns);

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [headColumns, bodyColumns, displayColumn]);

  return (
    <div
      ref={wrapperRef}
      className={open === true ? "container-show-column" : "hide"}
    >
      <form>
        <label htmlFor="search">Find column</label>
        <input
          type="search"
          id="search"
          name="search"
          value={list.search || ""}
          onChange={handleChange}
          placeholder="Column title"
        />
      </form>

      <div className="container-switch">
        {!list.headColumn.length ? (
          <p style={{ paddingLeft: 12 }}>
            Your query did not return any results
          </p>
        ) : (
          list.headColumn.map((value, index) => (
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
          ))
        )}
      </div>

      <div className="action">
        <button onClick={handleHideAll}>HIDE All</button>
        <button onClick={handleShowAll}>SHOW ALL</button>
      </div>
    </div>
  );
}

Display.propTypes = {
  headColumns: PropTypes.array,
  bodyColumns: PropTypes.array,
  displayColumn: PropTypes.bool,
};

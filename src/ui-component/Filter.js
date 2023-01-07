import PropTypes from "prop-types";
import { useRef, useState, useEffect } from "react";
import "../css/filter.css";

// ==============================|| FILTER ||============================== //

export default function Filter({ headColumns, filter }) {
  const wrapperRef = useRef(null);

  const [open, setOpen] = useState(filter);

  const [column, setColumn] = useState();
  const [operator, setOperator] = useState();
  const [value, setValue] = useState("");

  const handleClickOutside = (event) => {
    if (filter === true) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
  };

  const handleChangeColumn = (event) => {
    setColumn(event.target.value);
  };

  const handleChangeOperator = (event) => {
    setOperator(event.target.value);
  };

  const handleChangeValue = (event) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setOpen(filter);

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filter]);

  return (
    <div
      ref={wrapperRef}
      className={open === true ? "container-filter" : "hide"}
    >
      <form>
        <label htmlFor="columns">Column</label>

        <select
          id="columns"
          name="columns"
          value={column}
          onChange={handleChangeColumn}
        >
          {headColumns &&
            headColumns.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
        </select>
      </form>

      <form>
        <label htmlFor="operators">Operator</label>

        <select
          id="operators"
          name="operators"
          value={operator}
          onChange={handleChangeOperator}
        >
          {column === "id" ||
          column === "popularity" ||
          column === "vote_average" ||
          column === "vote_count" ? (
            <>
              <option value="=">=</option>
              <option value="!=">!=</option>
              <option value=">">{">"}</option>
              <option value=">=">{">="}</option>
              <option value="<">{"<"}</option>
              <option value="<=">{"<="}</option>
              <option value="is empty">is empty</option>
              <option value="is not empty">is not empty</option>
              <option value="is any of">is any of</option>
            </>
          ) : (
            <>
              <option value="contain">contain</option>
              <option value="equals">equals</option>
              <option value="start with">start with</option>
              <option value="ends with">ends with</option>
              <option value="is empty">is empty</option>
              <option value="is not empty">is not empty</option>
              <option value="is any of">is any of</option>
            </>
          )}
        </select>
      </form>

      <form>
        <label htmlFor="value">Value</label>
        <input
          type="text"
          id="value"
          name="value"
          value={value || ""}
          onChange={handleChangeValue}
          placeholder="Filter value"
        />
      </form>
    </div>
  );
}

Filter.propTypes = {
  headColumns: PropTypes.array,
  filter: PropTypes.bool,
};

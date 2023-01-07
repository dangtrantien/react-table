import PropTypes from "prop-types";
import { useRef, useState, useEffect } from "react";
import {
  IconArrowNarrowDown,
  IconArrowNarrowUp,
  IconDotsVertical,
} from "@tabler/icons";

// ==============================|| TABLE HEAD ||============================== //

export default function TableHead(props) {
  const {
    headColumns,
    order,
    orderBy,
    onRequestSort,
    handleUnsort,
    handleSortByASC,
    handleSortByDESC,
    handleFilter,
    handleHide,
    handleShow,
  } = props;

  const [dropDown, setDropDown] = useState(false);
  const [headColumnID, setHeadColumnID] = useState();

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const handleClick = (id) => {
    setHeadColumnID(id);
    setDropDown(!dropDown);
  };

  // onDragStart = (e) => {
  //   columnBeingDragged = Number(e.currentTarget.dataset.columnIndex);
  // };

  // onDrop = (e) => {
  //   e.preventDefault();
  //   const newPosition = Number(e.currentTarget.dataset.columnIndex);
  //   const currentCols = instance.getVisibleLeafColumns().map((c) => c.id);
  //   const colToBeMoved = currentCols.splice(columnBeingDragged, 1);

  //   currentCols.splice(newPosition, 0, colToBeMoved[0]);
  //   instance.setColumnOrder(currentCols);
  // };

  return (
    <thead>
      <tr>
        {headColumns &&
          headColumns.map((value, index) => (
            <th
              className="thead"
              id={`thead-${index}`}
              key={index}
              draggable
              // onDragStart={this.onDragStart}
            >
              <div onClick={createSortHandler(value)}>
                {value}
                {orderBy === value ? (
                  <>
                    {order === "desc" ? (
                      <IconArrowNarrowDown color="grey" />
                    ) : (
                      <IconArrowNarrowUp color="grey" />
                    )}
                  </>
                ) : null}
              </div>

              <div className="dropDown">
                <div className="more-vert" onClick={() => handleClick(index)}>
                  <IconDotsVertical />
                </div>

                <ul
                  style={{
                    width: 150,
                    top: 30,
                    left: 0,
                    color: "black",
                    fontWeight: 500,
                  }}
                  className={
                    dropDown === true && headColumnID === index ? "" : "hide"
                  }
                >
                  <li
                    onClick={() => {
                      setDropDown(false);
                      handleUnsort();
                    }}
                  >
                    Unsort
                  </li>
                  <li
                    onClick={() => {
                      setDropDown(false);
                      handleSortByASC(value);
                    }}
                  >
                    Sort by ASC
                  </li>
                  <li
                    onClick={() => {
                      setDropDown(false);
                      handleSortByDESC(value);
                    }}
                  >
                    Sort by DESC
                  </li>
                  <li
                    onClick={() => {
                      setDropDown(false);
                      handleFilter();
                    }}
                  >
                    Filter
                  </li>
                  <li
                    onClick={() => {
                      setDropDown(false);
                      handleHide(index);
                    }}
                  >
                    Hide
                  </li>
                  <li
                    onClick={() => {
                      setDropDown(false);
                      handleShow();
                    }}
                  >
                    Show columns
                  </li>
                </ul>
              </div>
            </th>
          ))}
      </tr>
    </thead>
  );
}

TableHead.propTypes = {
  headColumns: PropTypes.array,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  onRequestSort: PropTypes.any,
  handleUnsort: PropTypes.func,
  handleSortByASC: PropTypes.func,
  handleSortByDESC: PropTypes.func,
  handleFilter: PropTypes.func,
  handleHide: PropTypes.func,
  handleShow: PropTypes.func,
};

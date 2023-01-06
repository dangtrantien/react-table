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
    headCells,
    order,
    orderBy,
    columnId,
    onRequestSort,
    handleUnsort,
    handleSortByASC,
    handleSortByDESC,
    handleFilter,
    onHide,
    handleHide,
    handleShow,
  } = props;

  const [dropDown, setDropDown] = useState(false);
  const [headCellID, setHeadCellID] = useState();

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const handleClick = (id) => {
    setHeadCellID(id);
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

  useEffect(() => {
    if (headCells) {
      headCells.map((data, index) => {
        if (columnId === index && onHide === true) {
          document.getElementById(index).classList.add("hide");
          document.getElementById(`body ${index}`).classList.add("hide");
        }
      });
    }
  }, [headCells, columnId, onHide]);

  return (
    <thead>
      <tr>
        <th>#</th>
        {headCells &&
          headCells.map((value, index) => (
            <th
              className="table-head"
              id={index}
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
                    right: 0,
                    color: "black",
                    fontWeight: 500,
                  }}
                  className={
                    dropDown === true && headCellID === index ? "" : "hide"
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
  headCell: PropTypes.array,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  columnId: PropTypes.any,
  onRequestSort: PropTypes.any,
  handleUnsort: PropTypes.func,
  handleSortByASC: PropTypes.func,
  handleSortByDESC: PropTypes.func,
  handleFilter: PropTypes.func,
  onHide: PropTypes.bool,
  handleHide: PropTypes.func,
  handleShow: PropTypes.func,
};

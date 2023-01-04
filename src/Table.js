import PropTypes from "prop-types";
import { useState, useEfect, useMemo } from "react";
import { useTable, useBlockLayout, useResizeColumns } from "react-table";

// mui-material
import { Box, Grid, IconButton, Menu, MenuItem, Paper } from "@mui/material";

// icons
import {
  IconArrowNarrowDown,
  IconArrowNarrowUp,
  IconDotsVertical,
} from "@tabler/icons";

import { rows, headCells } from "./data";
import "./Table.css";
import TableHead from "./TableHead";

// ==============================|| TABLE ||============================== //

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function Table() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(13);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ mx: 30, mt: 10, overflow: "auto" }}>
      <table>
        <TableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
        />
        <tbody>
          {stableSort(rows, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
                <td>{row.calories}</td>
                <td>{row.fat}</td>
                <td>{row.carbs}</td>
                <td>{row.protein}</td>
              </tr>
            ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </Box>
  );
}

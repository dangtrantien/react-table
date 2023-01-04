import PropTypes from "prop-types";
import { useState, useEfect, useMemo } from "react";
import { styled, alpha } from "@mui/material/styles";

// mui-material
import { IconButton, Menu, MenuItem } from "@mui/material";

// icons
import {
  IconArrowNarrowDown,
  IconArrowNarrowUp,
  IconDotsVertical,
} from "@tabler/icons";

import { headCells } from "./data";
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
} from "@mui/icons-material";

// ==============================|| TABLE HEAD ||============================== //

const options = [
  "Unsort",
  "Sort by ASC",
  "Sort by DESC",
  "Filter",
  "Hide",
  "Show columns",
];

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    minWidth: 130,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function TableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <thead>
      <tr>
        {headCells.map((headCell) => (
          <th key={headCell.id} onClick={createSortHandler(headCell.id)}>
            {headCell.label}
            {orderBy === headCell.id ? (
              <>
                {order === "desc" ? (
                  <ArrowDownwardOutlined />
                ) : (
                  //   <IconArrowNarrowDown/>
                  <ArrowUpwardOutlined />
                  //   <IconArrowNarrowUp />
                )}
              </>
            ) : null}

            <IconButton onClick={handleClick}>
              <IconDotsVertical />
            </IconButton>
          </th>
        ))}
      </tr>

      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options.map((option) => (
          <MenuItem key={option} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </StyledMenu>
    </thead>
  );
}

TableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["unsort", "asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

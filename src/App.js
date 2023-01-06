import { useEffect, useState } from "react";
import "./css/table.css";
import TableHead from "./TableHead";
import Pagination from "./ui-component/Pagination";
import Display from "./ui-component/Display";
import Filter from "./ui-component/Filter";
import API from "./API";

// ==============================|| TABLE ||============================== //
const api = new API();

export default function App() {
  const [headCells, setHeadCells] = useState([]);
  const [rows, setRows] = useState([]);

  const [order, setOder] = useState("asc");
  const [orderBy, setOderBy] = useState("id");

  const [page, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [columnID, setColumnID] = useState();
  const [filter, setFilter] = useState(false);
  const [hide, setHide] = useState(false);
  const [show, setShow] = useState(false);

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const stableSort = (array, comparator) => {
    if (array) {
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
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";

    setOder(isAsc ? "desc" : "asc");
    setOderBy(property);
  };

  const handleUnsort = () => {
    setOder("");
    setOderBy("");
  };

  const handleSortByASC = (property) => {
    setOder("asc");
    setOderBy(property);
  };

  const handleSortByDESC = (property) => {
    setOder("desc");
    setOderBy(property);
  };

  const handleFilter = () => {
    setFilter(!filter);
  };

  const handleHide = (property) => {
    setColumnID(property);
    setHide(true);
  };

  const handleShow = () => {
    setShow(!show);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    api.getList().then((result) => {
      result.data.items.map((res) => {
        delete res.adult;
        delete res.backdrop_path;
        delete res.genre_ids;
        delete res.video;

        setHeadCells(Object.keys(res));
      });

      setRows(result.data.items);
    });
  }, [rowsPerPage]);

  return (
    <>
      <h1 style={{ width: "100%", textAlign: "center" }}>Table List</h1>

      <div className="box">
        <div className="paper">
          <table>
            <TableHead
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              columnId={columnID}
              onHide={hide}
              handleUnsort={handleUnsort}
              handleSortByASC={handleSortByASC}
              handleSortByDESC={handleSortByDESC}
              handleFilter={handleFilter}
              handleHide={handleHide}
              handleShow={handleShow}
            />

            <tbody>
              {rows &&
                (rowsPerPage > 0
                  ? stableSort(rows, getComparator(order, orderBy)).slice(
                      (page - 1) * rowsPerPage,
                      (page - 1) * rowsPerPage + rowsPerPage
                    )
                  : stableSort(rows, getComparator(order, orderBy))
                ).map((row, index) => (
                  <tr key={index} className="table-body">
                    <td>{index}</td>
                    <td id="body 0" className="number">
                      {row.id}
                    </td>
                    <td id="body 1">{row.media_type}</td>
                    <td id="body 2">{row.original_language}</td>
                    <td id="body 3">{row.original_title}</td>
                    <td id="body 4">{row.overview}</td>
                    <td id="body 5" className="number">
                      {row.popularity}
                    </td>
                    <td id="body 6">{row.poster_path}</td>
                    <td id="body 7">{row.release_date}</td>
                    <td id="body 8">{row.title}</td>
                    <td id="body 9" className="number">
                      {row.vote_average}
                    </td>
                    <td id="body 10" className="number">
                      {row.vote_count}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <Filter headCell={headCells} filter={filter} />

          <Display headCell={headCells} showColumn={show} />
        </div>

        <div className="table-footer">
          <form>
            <label htmlFor="rows">Rows per page:</label>

            <select
              id="rows"
              name="rows"
              value={rowsPerPage === -1 ? "All" : rowsPerPage}
              onChange={handleChangeRowsPerPage}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={-1}>All</option>
            </select>
          </form>

          <Pagination
            currentPage={page}
            totalCount={rows.length}
            rowsPerPage={rowsPerPage}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
          />
        </div>
      </div>
    </>
  );
}

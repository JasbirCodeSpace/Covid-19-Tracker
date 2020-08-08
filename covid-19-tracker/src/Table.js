import React, { useState, useEffect } from "react";
import numeral from "numeral";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import "./Table.css";

const columns = [
  { id: "flag", label: "Flag", minWidth: 170 },
  { id: "name", label: "Country", minWidth: 100 },
  {
    id: "cases",
    label: "Cases",
    minWidth: 170,
    align: "right",
    format: (value) => numeral(value).format("0,0"),
  },
  {
    id: "recovered",
    label: "Recovered",
    minWidth: 170,
    align: "right",
    format: (value) => numeral(value).format("0,0"),
  },
  {
    id: "deaths",
    label: "Deaths",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(country) {
  const flag = country.countryInfo.flag;
  const name = country.country;
  const cases = country.cases;
  const deaths = country.deaths;
  const recovered = country.recovered;
  return { flag, name, cases, deaths, recovered };
}

function createRows(countries) {
  const rows = countries.map((country) => {
    return createData(country);
  });
  return rows;
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 400,
  },
});

function TableContent({ countries }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    console.log(countries);
    setRows(createRows(countries));
  }, [countries]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ width: "20%" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    <TableCell key={columns[0].id} align={columns[0].align}>
                      <img src={row[columns[0].id]} width="40" height="25" />
                    </TableCell>
                    {columns.slice(1).map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default TableContent;

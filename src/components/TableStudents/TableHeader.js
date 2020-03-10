import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Checkbox from "@material-ui/core/Checkbox";

import StateContext from '../../context/StateContext'
  
function TableHeader(props) {
  
  const{tests} = React.useContext(StateContext)

  const headCells = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Студенты"
    },
    { 
      id: "group", 
      numeric: false, 
      disablePadding: false, 
      label: "Группа"
    },
  ];
  let headCellsTests=[]

  tests.forEach(test => {
    headCellsTests.push({
      id:`theme${test._id}`,
      numeric: false,
      disablePadding: false, 
      label: test.theme
    })
  });

    const {
      classes,
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort
    } = props;
    const createSortHandler = property => event => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          <TableCell padding = "checkbox" align = "right">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ "aria-label": "select all students" }}
            />
            </TableCell>
            <TableCell padding = "checkbox" align = "left"></TableCell>
          {headCells.map(headCell => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "default"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}

          {headCellsTests.map(headCellTest => (
            <TableCell
              key={headCellTest.id}
              align={headCellTest.numeric ? "right" : "left"}
              padding={headCellTest.disablePadding ? "none" : "default"}
            >
              {headCellTest.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  export default TableHeader
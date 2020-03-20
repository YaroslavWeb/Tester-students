import React from "react";
import {  makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";

import TableHeader from './TableHeader'
import TableToolbar from './TableToolbar'
import TableDialogEdit from './TableDialogEdit'

import StateContext from '../../context/StateContext'

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc" ? (a, b) => desc(a, b, orderBy): (a, b) => -desc(a, b, orderBy);
}


const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1
  }
}));


export default function StudentsTable(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [selected, setSelected] = React.useState([]);
  const {students,tests} = React.useContext(StateContext);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const clearSelected = () =>{
    setSelected([]);
  }
  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = students.map(n => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  const isSelected = id => selected.indexOf(id) !== -1;
  let markStyle = (markValue)=>{
    if(markValue >= 90) return 'greenMark'
    if(markValue >= 75) return 'salatMark'
    if(markValue >= 60) return 'orangeMark'
    if(markValue >= 0) return 'redMark'
  }
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolbar indexs={selected} 
        removeStudents={props.removeStudents} 
        numSelected={selected.length} 
        clearSelected ={clearSelected}
        setAlert = {props.setAlert}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <TableHeader
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={students.length}
            />
            <TableBody>
              {stableSort(students, getSorting(order, orderBy)).map(
                (row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding = "checkbox" align = "right" >
                        <Checkbox
                          onClick={event => handleClick(event, row._id)}
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell padding = "checkbox" align = "left">
                        <TableDialogEdit setAlert = {props.setAlert} editStudent={props.editStudent} student={row}/>
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.group}</TableCell>
                      {tests.map(test => {
                        const cellKey = test._id +'_' + row._id
                        const markArray = row.marks.filter(mark => mark.id_test === test._id)
                        return(
                          <TableCell key={cellKey} style={{fontWeight:'bold', fontSize:'1.5rem'}} align="left">
                            {markArray.length ? 
                            <span className={markStyle(markArray[0].mark)}>{markArray[0].mark}</span> 
                            :<span style = {{color:'white', backgroundColor:'#83898B', padding:'5px', borderRadius: '5px'}}>{'-'}</span>}
                          </TableCell>
                        )
                      })}
                      
                    </TableRow>
                  );
                }
              )}
              <TableRow style={{ height: 30 }} />
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

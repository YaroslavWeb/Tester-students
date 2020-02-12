import React from "react";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import TableDialogDelete from "./TableDialogDelete";

const useToolbarStyles = makeStyles(theme => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1)
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85)
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark
          },
    title: {
      flex: "1 1 100%"
    }
  }));

function TableToolbar(props) {
    const classes = useToolbarStyles();
    const  {numSelected } = props;
  
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0
        })}
      >
        {numSelected > 0 ? (
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
          >
            {numSelected} выбрано
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle">
          Таблица студентов
          </Typography>
        )}
        {numSelected > 0 ? (
          
        <TableDialogDelete
        indexs = {props.indexs}
        removeStudents = {props.removeStudents} 
        clearSelected = {props.clearSelected}
        setAlert = {props.setAlert}
        />
         
        ) : (
          null
        )}
      </Toolbar>
    );
  };

  export default TableToolbar
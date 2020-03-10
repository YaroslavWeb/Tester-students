import React from 'react';
import {NavLink} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LogoutDialog from '../LogoutDialog'

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  },
  root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
}));

export default function MainHeader() {
  const classes = useStyles();
  return (
    <div>
    <div className={classes.root}>
      <AppBar position="static" style = {{background:'#006F51'}}>
        <Toolbar style = {{ display: 'flex', justifyContent: 'space-between'}}>
            <nav className="cl-effect-4">
                  <NavLink to='/students' activeClassName = 'active'>
                    Студенты
                  </NavLink>
                  <NavLink to='/test' activeClassName = 'active'>
                    Тесты
                  </NavLink>
                  <NavLink to='/info' activeClassName = 'active'>
                    Инструкция
                  </NavLink>
            </nav>
           <LogoutDialog/>
        </Toolbar>
     </AppBar>
   </div>
    </div>
  );
}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ExitWorkDialog from './ExitWorkDialog'
import LinearProgress from "@material-ui/core/LinearProgress";
const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  },
  root: {
        flexGrow: 1,
        width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
      },},
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
}));

export default function MainHeader(props) {
  const classes = useStyles();
  return (
    <div >
      <AppBar position="static" style = {{background:'#006F51'}}>
        <Toolbar style = {{ display: 'flex', justifyContent: 'space-between'}}>
          <Typography variant='h5' >
            {props.workTestTheme}
          </Typography>
            <div className={classes.root}>
              <LinearProgress variant="determinate" value={0} />
               <LinearProgress variant="determinate" value={0}  color="secondary" />
            </div>
           <ExitWorkDialog/>
        </Toolbar>
     </AppBar>
   </div>
  );
}
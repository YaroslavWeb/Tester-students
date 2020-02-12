import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TestAddDialog from '../TestConstructorAdd'

const useStyles = makeStyles({
  card: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    height:'100%',
    minHeight: 200,
    minWidth: 275,
    boxShadow: '0.4em 0.4em 5px rgba(122,122,122,0.5)',
  },
  pos: {
    marginBottom: 12,
  }
});

export default function TestAddCard(props) {
  const classes = useStyles();

  return (
    <Card
      className={classes.card} 
      variant="outlined">
    <TestAddDialog 
    setAlert= {props.setAlert}/>
    </Card>
  );
}
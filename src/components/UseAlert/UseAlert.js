import React, { Component } from 'react'
import Alert from '@material-ui/lab/Alert'
import Slide from '@material-ui/core/Slide';

const UseAlert = (props) =>{
   
    return(
        <Slide direction="left" in={props.alertState.visible}  mountOnEnter unmountOnExit>
            <Alert style = {{position:'absolute', zIndex:9999, width: '300px', right: '0' , 
            marginRight: '20px' }} 
             variant="filled" 
             severity= {props.alertState.severity}>
             {props.alertState.text}
             </Alert>
        </Slide>
      )
}

export default UseAlert
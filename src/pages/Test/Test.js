import React from 'react'
import TeacherHeader from '../../components/TeacherHeader'
import StateContext from '../../context/StateContext'
import Grid from '@material-ui/core/Grid'
import Grow from '@material-ui/core/Grow'
import TestCard from '../../components/TestCard'
import TestAddCard from '../../components/TestAddCard'
import TestAlert from '../../components/UseAlert'

const Test = () => {
  const {tests} = React.useContext(StateContext)
 const[open, setOpen]= React.useState({visible: false, text:'',severity:''});
 if(document.cookie != '')
 return (
    <div> 
      <TestAlert 
        alertState = {open}
        setAlert = {setOpen}
      />
     <TeacherHeader />
    
     <Grid container style={{padding:20}}>
      {tests.map(test=>{
        return(  
        <Grow
          in={true}
          timeout={1500}
          key={test._id}
        >
          <Grid style={{padding:20}}  item xs={12} sm={6} md={4} lg={3} xl={2}>
            <TestCard 
              alertState = {open}
              setAlert= {setOpen}
              test={test}/> 
          </Grid>
        </Grow>
        )
      })}
        <Grow
          in={true}
          timeout={1500}
        >
        <Grid style={{padding:20}} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <TestAddCard
          alertState = {open}
          setAlert= {setOpen}
          />
        </Grid>
        </Grow>
      </Grid>
    </div>
  )
  else return(
    <div>
      {window.location.replace('#/')}
    </div>
  )
} 
export default Test;
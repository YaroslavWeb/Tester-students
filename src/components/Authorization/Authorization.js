import React  from 'react'
import StateContext from '../../context/StateContext'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid'
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

  
const Authorization =(props) => {

const [value, setValue] = React.useState(0);
const [loginStudent, setLoginStudent] = React.useState(false);

const handleChange = (event, newValue) => {setValue(newValue)};

const {students, tests, teachers} = React.useContext(StateContext)


let inputLogin,inputPassword,inputStud;

  return (
      <Grid container justify="center" alignItems="center" style={{marginTop:'20px'}} >
        
        <form  id='AuthorizationForm'> 
          <Grid item >
          <AppBar position="static" style={{backgroundColor:' #006F51'}}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Студент" {...a11yProps(0)} />
          <Tab label="Преподаватель" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
    
      <TabPanel value={value} index={0} >
       
        <Autocomplete
          options={students}
          getOptionLabel={option => option.name}
          renderInput={params => (
          <TextField {...params} 
            error ={loginStudent}
            helperText="Введите ФИО"
            variant="outlined" 
            inputRef={node => inputStud = node}
            fullWidth 
          />
         )}/> 
          <div style={{marginTop:'20px', display:'flex',justifyContent:'flex-end'}}>
            <Button
              style ={{marginTop:'10px'}}
               onClick={() => {
                 if (inputStud.value == '' || inputStud.value == undefined) {
                   setLoginStudent(true);
                 }
                 else {
                  props.setAuthVisible(false)
                  props.setCurTest(tests)
                  props.setStud(students.filter(student=>student.name === inputStud.value))
                }
               }}
               variant="outlined"
               style ={{color: '#006F51', borderColor:'#006F51'}}>
               Войти
            </Button>
           </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
        <TextField
            label="Логин" 
            inputRef={node => inputLogin = node}
            variant="outlined" 
            fullWidth
          /> <br/>
          <TextField
            label="Пароль"
            type = "password"
            inputRef={node => inputPassword = node}
            variant="outlined"
            style={{marginTop:'15px'}}
            fullWidth
          />
          <div style={{marginTop:'20px', display:'flex',justifyContent:'flex-end'}}>
            <Button
              variant="outlined" 
              style ={{color: '#006F51', marginTop:'10px', borderColor:'#006F51'}}
              onClick={()=>{
                console.log(teachers);
                
                if(inputPassword.value == '' && inputLogin.value == '' ||
                   inputLogin.value === teachers[0].username && inputPassword.value === teachers[0].password){
                    document.cookie = `user=${teachers[0].username}`;
                    window.location.replace('#/students');
                }
              }}
            >
              Войти
            </Button>
          </div>
        </TabPanel>
        </Grid>
        </form>
        
      </Grid>
   );
  }
    export default Authorization

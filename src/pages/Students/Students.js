import React from 'react'
import TableStudents from '../../components/TableStudents'
import StudentDialogAdd from '../../components/StudentDialogAdd'
import StudentDialogRemove from '../../components/StudentDialogRemove'
import StudentAlert from '../../components/UseAlert'
import TeacherHeader from '../../components/TeacherHeader'

const Students = (props) =>{
    const [open, setOpen] = React.useState({visible: false, text:'',severity:''});
    if(document.cookie !== '')
    return(
      <div>
      <TeacherHeader/>
      <StudentAlert 
        alertState = {open}
        setAlert = {setOpen}
      />

      <div style={{display:'flex', flexDirection:'row'}}>
        <StudentDialogAdd
          addStudent={props.addStudent}
          setAlert={setOpen}
        />
        <StudentDialogRemove
          removeStudentsByGroup={props.removeStudentsByGroup}
          setAlert = {setOpen}
        />
      </div>

      <TableStudents 
        editStudent={props.editStudent}
        removeStudents={props.removeStudents}
        setAlert = {setOpen}
      />
    </div>
    )
    else return(
      <div>
        {window.location.replace('#/')}
      </div>
    )
} 
export default Students;
import React, {useEffect, useState} from "react"
import Home from '../pages/Home'
import Students from '../pages/Students'
import Test from '../pages/Test'
import Info from '../pages/Info'
import Work from '../pages/Work'
import { HashRouter as Router, Route } from 'react-router-dom'
import StateContext from '../context/StateContext'

const db = window.require('electron').remote.getGlobal('database');

const App = () =>{
  const [teachers, setTeachers] = useState([])

  const [students, setStudents] = useState([]);

  const [tests, setTests] = useState([]);

  useEffect(()=>{
    db.tests.find({}, (err, docs)=>{setTests(docs)})
    db.teachers.find({}, (err,docs)=>{setTeachers(docs)})
    db.students.find({}, (err, docs)=>{setStudents(docs)})
  },[])

  const addTest = (theme, time, attempts, maxTasksWork, tagsGroups, manualSrc, tasks) =>{
    let newTest = {
      theme,
      time,
      attempts,
      maxTasksWork,
      tagsGroups,
      manualSrc,
      tasks:tasks.map(task =>{
        return{
          id:task.id,
          type: task.type.value,
          score: task.score.value,
          question: task.question.value,
          imgSrc:task.imgSrc,
          answers: task.answers.map(answer=>{
            return{
              id:answer.id,
              answer:answer.answer.value,
              correct:answer.correct.checked
            }
          })
      }})
    }
    db.tests.insert(newTest)
    db.tests.find({}, (err, docs)=>{setTests(docs)})
  }

  const addStudent = (name, group) =>{
    let namesArr = name
        .split("\n")
        .map(val => val.trim())
        .filter(val => val !== '')
      
    let puplesObj = []
    namesArr.forEach(puple => {
      puplesObj.push({
        name:puple,
        group,
        marks: []
      })
    });
    db.students.insert(puplesObj)
    db.students.find({}, (err, docs)=>{setStudents(docs)})
  }

  const editStudent = (id, name, group, newMarks, newAttempts) =>{
    students.forEach(student => {
      if(student._id == id){
        const newStudent ={...student, name, group}
        for (const key in student.marks) {
          newStudent.marks[key].mark = newMarks[key]
          newStudent.marks[key].attempts = newAttempts[key]
        }
        db.students.update({_id:newStudent._id},{$set:newStudent})
      }
    });
    db.students.find({}, (err, docs)=>{setStudents(docs)})
  }

  const editTest = (id, theme, time, attempts, maxTasksWork, tagsGroups, manualSrc, tasks) =>{
    let editTest
    tests.forEach(test => {
      if(test._id == id){
        editTest ={...test, theme, time, attempts, maxTasksWork, tagsGroups, manualSrc, tasks}}
      });
      
    db.tests.update({_id:editTest._id}, {$set:{editTest}})
    db.tests.find({}, (err, docs)=>{setTests(docs)})
  }

  const removeStudents = (ids) =>{
    for (const key in ids) {
      db.students.remove({_id:ids[key]})
    }
    db.students.find({}, (err, docs)=>{setStudents(docs)})
  }


  const removeStudentsByGroup = (group) =>{
    db.students.remove({group}, {multi: true})
    db.students.find({}, (err, docs)=>{setStudents(docs)})
  }

  const removeTest = (id_test) =>{
    db.tests.remove({_id:id_test})
    db.tests.find({}, (err, docs)=>{setTests(docs)})
  }

  return(
    <StateContext.Provider value={{students, setStudents, tests, setTests, teachers, addTest, removeTest, editTest}}>
      <Router>
        <div>
        <main>
          <Route exact path="/" render={() => <Home/>}/>
          <Route path="/students" render={() => 
            <Students
              editStudent={editStudent}
              addStudent={addStudent}
              removeStudents={removeStudents}
              removeStudentsByGroup={removeStudentsByGroup}
          />}/>

          <Route path="/test" render={() => <Test/>}/>

          <Route path="/info" render={() => <Info/>}/>
                      
          <Route path="/work" render={() => <Work />}/>
        </main>
       </div>
      </Router>

    </StateContext.Provider>
  )
}  
export default App;

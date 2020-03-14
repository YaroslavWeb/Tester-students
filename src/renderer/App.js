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
  
  const [students, setStudents] = useState([]);

  const [tests, setTests] = useState([]);

  useEffect(()=>{
    db.students.find({}, (err, docs)=>{setStudents(docs)})
    db.tests.find({}, (err, docs)=>{setTests(docs)})
  },[])

  const addTest = (theme, time, attempts, tasks) =>{
    let newTest = {
      theme,
      time,
      attempts,
      tasks:tasks.map(task =>{
        return{
          id:task.id,
          type: task.type.value,
          score: task.score.value,
          section: task.section.value,
          question: task.question.value,
          answers: task.answers.map(answer=>{
            return{
              id:answer.id,
              answer:answer.answer.value,
              correct:answer.correct.checked
            }
          })
      }})
    }
    // db.students.update({},{$push:{marks:{...newMark}}},{multi: true})
    db.tests.insert(newTest)
    db.tests.find({}, (err, docs)=>{setTests(docs)})
  }
  const addStudent = (name, group) =>{
    let namesArr = name
        .split("\n")
        .map(val => val.trim())
        .filter(val => val !== '')
      
    let puplesObj = [],
        markID = 1;
    namesArr.forEach(puple => {
      markID = 1;
      puplesObj.push({
        name:puple,
        group,
        marks: tests.map(test=>{
          return{
            id: markID++,
            id_test:test._id,
            theme: test.theme,
            attempts:test.attempts,
            mark:'-'
          }
        })
      })
    });
    db.students.insert(puplesObj)
    db.students.find({}, (err, docs)=>{setStudents(docs)})
  }
  const editStudent = (id, name, group, newMarks, newAttempts) =>{
    students.forEach(student => {
      if(student._id == id){
        const newStudent ={...student, name, group}
        // изменяет существующую оценку
        for (const key in student.marks) {
          newStudent.marks[key].mark = newMarks[key]
          newStudent.marks[key].attempts = newAttempts[key]
        }
        db.students.update({_id:newStudent._id},{$set:newStudent})
      }
    });
    db.students.find({}, (err, docs)=>{setStudents(docs)})
  }
  const editTest = (id, theme, time, attempts) =>{
    let editTest
    tests.forEach(test => {
      if(test._id == id){
        editTest ={...test, theme, time, attempts}}
      });
      console.log(editTest);
      
    db.tests.update({_id:editTest._id}, {$set:editTest})
    db.tests.find({}, (err, docs)=>{setTests(docs)})
  }
  const removeStudents = (ids) =>{
    console.log(ids);
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
    <StateContext.Provider value={{students, tests, addTest, removeTest, editTest}}>
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

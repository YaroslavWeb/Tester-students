import React, {useEffect, useState, useReducer} from "react"
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
      id:tests.length+1,
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
    },
    newMark={
      id:newTest.id,
      theme:newTest.theme,
      attempts:newTest.attempts,
      mark:'-'
    }

    db.students.update({},{$push:{marks:{...newMark}}},{multi: true})
    db.tests.insert(newTest)

    db.students.find({}, (err, docs)=>{setStudents(docs)})
    db.tests.find({}, (err, docs)=>{setTests(docs)})
  }
  const addStudent = (name, group) =>{
    let namesArr = name
        .split("\n")
        .map(val => val.trim())
        .filter(val => val !== '')
      
    let puplesObj = [];

    namesArr.forEach(puple => {
      puplesObj.push({
        id: performance.now(),
        name:puple,
        group,
        marks: tests.map(test=>{
          return{
            id: test.id,
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
  const editStudent = (id, name, group, newMarks) =>{
    students.map(student=>{
      if(student.id == id){
        const newStudent ={...student, name, group}
        for (const key in student.marks) {
          newStudent.marks[key].mark = newMarks[key]
        }
        db.students.update({id:newStudent.id},{$set:newStudent})
        return newStudent;
      }
      return student;
    })
    
    db.students.find({}, (err, docs)=>{setStudents(docs)})
  }
  const editTest = (id, theme, time, attempts) =>{
    let editTest
    tests.map(test=>{
      if(test.id == id){
          editTest ={...test, theme, time, attempts}
        }
        return test;
      })
      
      db.tests.update({id:editTest.id}, {$set:editTest})
      db.tests.find({}, (err, docs)=>{setTests(docs)})
  }
  const removeStudents = (ids) =>{
    for (const key in ids) {
      db.students.remove({id:ids[key]})
    }
    db.students.find({}, (err, docs)=>{setStudents(docs)})
  }
  const removeStudentsByGroup = (group) =>{
    db.students.remove({group}, {multi: true})
    db.students.find({}, (err, docs)=>{setStudents(docs)})
  }
  const removeTest = (id_test, theme_test) =>{

    // students.forEach(student => {
    //   for(const key in student.marks) {
    //     if(student.marks[key].theme == theme_test){
    //     }
    //   }
    // });
    db.students.remove({marks:theme_test},{multi:true})
    db.tests.remove({id:id_test})
    db.students.find({}, (err, docs)=>{setStudents(docs)})
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
                      
        <Route path="/work" render={() => <Work/>}/>
        </main>
        </div>
      </Router>

    </StateContext.Provider>
  )
}  
export default App;

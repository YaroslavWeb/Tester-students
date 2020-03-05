import React, {useEffect, useState, useReducer} from "react"
import Home from '../pages/Home'
import Students from '../pages/Students'
import Test from '../pages/Test'
import Info from '../pages/Info'
import Work from '../pages/Work'
import { HashRouter as Router, Route } from 'react-router-dom'
import StateContext from '../context/StateContext'
import studentReducer from '../reducer/studentReducer'
import testsReducer from '../reducer/testsReducer'

const db = window.require('electron').remote.getGlobal('database');

const App = () =>{
  
  const [students, setStudents] = useState([]);

  const [tests, setTests] = useState([]);

  
  useEffect(()=>{
    db.students.find({}, (err, docs)=>{setStudents(docs)})
    db.tests.find({}, (err, docs)=>{setTests(docs)})
  },[])
  
  console.log(tests);
  
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
      mark:'-'
    }

    students.map(student=>student.marks.push({...newMark}))

    setTests(tests.concat(newTest))
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
            mark:'-'
          }
        })
      })
    });
    setStudents(students.concat(puplesObj))
  }
  const editStudent = (id, name, group, newMarks) =>{
    const editedStudents = students.map(student=>{
      if(student._id == id){
        const newStudent ={...student, name, group}
        for (const key in student.marks) {
          newStudent.marks[key].mark = newMarks[key]
        }
        return newStudent;
      }
      return student;
    })
    setStudents(editedStudents)
  }
  const editTest = (id, theme, time, attempts) =>{
    const editedTest = tests.map(test=>{
      if(test.id == id){
          test ={...test, theme, time, attempts}
        }
        return test;
      })
      setTests(editedTest)
    }
  const removeStudents = (ids) =>{
    setStudents(students.filter(student => !ids.includes(student.id)))
  }
  const removeStudentsByGroup = (group) =>{
    setStudents(students.filter(student => student.group !== group))
  }
  const removeTest = (id_test, theme_test) =>{
    students.map(student=>{
        for(const key in student.marks) {
          if(student.marks[key].theme == theme_test){
            delete student.marks[key]
          }
        }
        return student
      }
    )
    
    setTests(tests.filter(test =>test.id !== id_test))
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

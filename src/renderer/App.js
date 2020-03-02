import React, {useEffect, useState, useReducer} from "react"
import Home from '../pages/Home'
import Students from '../pages/Students'
import Test from '../pages/Test'
import Info from '../pages/Info'
import Work from '../pages/Work'
import Authorization from "../pages/Authorization/Authorization"
import { HashRouter as Router, Route } from 'react-router-dom'
import StateContext from '../context/StateContext'
import studentReducer from '../reducer/studentReducer'
import testsReducer from '../reducer/testsReducer'

const db = window.require('electron').remote.getGlobal('database');


const App = () =>{
  
  const [students, setStudents] = useState([
    {id:1, name:'Карпухин А.С.', group:'ПИ-16', marks:[
      {id:1, mark:'4', theme: 'if else'},
      {id:2, mark:'1', theme: 'For while'}
    ]},
    {id:2, name:'Алтаев А.С.', group:'ПИ-16', marks:[
      {id:1, mark:'3', theme: 'if else'},
      {id:2, mark:'3', theme: 'For while'}
    ]},
    {id:3, name:'Сергеев А.С.', group:'ИС-16', marks:[
      {id:1, mark:'4', theme: 'if else'},
      {id:2, mark:'2', theme: 'For while'},
    ]}
  ]);

  const [tests, setTests] = useState([
    {id:1, theme:'If else', time:240, attempts:3, tasks:[
      {id:1, type:'Одиночный выбор', score:1, section:1, question:'В чём разница If и Case?', answers:[
        {id:1, title:'Ответ №1', correct:true, answer:'Он такой-то'},
        {id:2, title:'Ответ №2', correct:false, answer:'Он вот такой'},
        {id:3, title:'Ответ №3', correct:false, answer:'Он не такой'},
        {id:4, title:'Ответ №4', correct:false, answer:'Он какой-то вот такой'}
      ]},
      {id:2, type:'Ввод текста', score:2, section:1, question:'Зачем нужен else?', answers:[
        {id:1, title:'Ответ №1', correct:true, answer:'Он такой-то'},
        {id:2, title:'Ответ №2', correct:false, answer:'Он вот такой'},
        {id:3, title:'Ответ №3', correct:false, answer:'Он не такой'},
        {id:4, title:'Ответ №4', correct:false, answer:'Он какой-то вот такой'}
      ]},
      {id:3, type:'Множественный выбор', score:2, section:1, question:'Зачем нужен Switch?', answers:[
        {id:1, title:'Ответ №1', correct:true, answer:'Он такой-то'},
        {id:2, title:'Ответ №2', correct:false, answer:'Он вот такой'},
        {id:3, title:'Ответ №3', correct:false, answer:'Он не такой'},
        {id:4, title:'Ответ №4', correct:false, answer:'Он какой-то вот такой'}
      ]}
    ]},
    {id:2, theme:'For while', time:240, attempts:3, tasks:[
      {id:1, type:'Одиночный выбор', score:1, section:1, question:'В чём разница If и Case?', answers:[
        {id:1, title:'Ответ №1', correct:true, answer:'Он такой-то'},
        {id:2, title:'Ответ №2', correct:false, answer:'Он вот такой'},
        {id:3, title:'Ответ №3', correct:false, answer:'Он не такой'},
        {id:4, title:'Ответ №4', correct:false, answer:'Он какой-то вот такой'}
      ]},
      {id:2, type:'Ввод текста', score:2, section:1, question:'Зачем нужен else?', answers:[
        {id:1, title:'Ответ №1', correct:true, answer:'Он такой-то'},
        {id:2, title:'Ответ №2', correct:false, answer:'Он вот такой'},
        {id:3, title:'Ответ №3', correct:false, answer:'Он не такой'},
        {id:4, title:'Ответ №4', correct:false, answer:'Он какой-то вот такой'}
      ]}
    ]}
  ]);

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
        id: Math.random() * (1000 - 4) + 4,
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
      if(student.id == id){
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

import React from 'react';
import Grid from '@material-ui/core/Grid'

import TeacherHeader from '../../components/TeacherHeader'

const Info = props =>{
  return (
    <div>
     <TeacherHeader/>
     <Grid container style={{padding:'20px'}}>
      <Grid item xs={12}>
        Страница "Студенты": <br/>
        На странице "Студенты находятся несколько элементов": <br/>
        {/* 1) Кнопка "Добавить студентов" <br/>
          <img src="D:\Diplom_2.0\Tester-students\src\assets\images\AddStudent_button.png"/> <br/>
          При нажатии на эту кнопку откроется модальное окно для добавления студентов в программу:<br/>
          <img src="D:\Diplom_2.0\Tester-students\src\assets\images\AddStudent_modal.png"/> <br/>
          Добавлять можно как одного, так и несколько студентов, каждый следующий студент должен начинаться с новой строки. <br/>
          Поле "Группа", также как и поле "Студент" является обязательным к заполнению. <br/>
          Пример правильного заполнения: <br/>
          <img src="D:\Diplom_2.0\Tester-students\src\assets\images\AddStudent_modalFilled.png"/> <br/>
          После нажатия кнопки "готово" в таблицу добавятся введёные в окне студенты <br/>
          <img src="D:\Diplom_2.0\Tester-students\src\assets\images\OnlyStudentTable.png"/> <br/>
          Удаление студента реализуется через выбор студента и нажатия кнопки с изображением мусорной корзины. <br/>
          <img src="D:\Diplom_2.0\Tester-students\src\assets\images\DeleteOneStudent.png"/> <br/>
          Удалить можно как одного конкретного студента, так и всех студентов в таблице сразу, по нажатию поля слева от заголовка "Студенты" <br/>
          <img src="D:\Diplom_2.0\Tester-students\src\assets\images\DeleteAllStudents.png"/> <br/>
          После нажатия мусорной корзины откроется окно подтверждения, при нажатии кнопки "подтверждаю", из таблицы удалятся выбранные студенты и вся информация о них <br/>
          <img src="D:\Diplom_2.0\Tester-students\src\assets\images\ModalDeleteStudents.png"/> <br/> */}

           

      </Grid>
      <Grid item xs={12}>
        Страница "Тесты":
      </Grid>
      <Grid item xs={12}>
        Рекомендации:
      </Grid>
     </Grid>
    </div>
  )
} 
export default Info;
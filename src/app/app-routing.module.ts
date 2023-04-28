import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeachersComponent } from './teachers/teachers.component';
import { StudentsComponent } from './students/students.component';
import { ExamsComponent } from './exams/exams.component';
import { ExamScoresComponent } from './exam-scores/exam-scores.component';

const routes: Routes = [
  {
    path: "teachers", component: TeachersComponent
  },
  {
    path:"students",component:StudentsComponent
  },
  {
    path:"exams",component:ExamsComponent,
  },
  {
    path:"exams/:id/scores",component:ExamScoresComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

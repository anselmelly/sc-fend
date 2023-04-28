import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {   ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from "@angular/common/http"


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MasterComponent } from './layouts/master/master.component';
import { SidebarComponent } from './partials/sidebar/sidebar.component';
import { TeachersComponent } from './teachers/teachers.component';
import { StudentsComponent } from './students/students.component';
import { ExamsComponent } from './exams/exams.component';
import { ListComponent } from './students/list/list.component';
import { CreateComponent } from './students/create/create.component';
import { ListTeachersComponent } from './teachers/list-teachers.component';
import { CreateTeachersComponent } from './teachers/create-teachers.component';
import { ExamScoresComponent } from './exam-scores/exam-scores.component';



@NgModule({
  declarations: [
    AppComponent,
    MasterComponent,
    SidebarComponent,
    TeachersComponent,
    StudentsComponent,
    ExamsComponent,
    ListComponent,
    CreateComponent,
    ListTeachersComponent,
    CreateTeachersComponent,
    ExamScoresComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

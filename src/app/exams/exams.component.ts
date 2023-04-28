import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Exam } from '../shared/exam';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Teacher } from '../shared/teacher';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Confirm, Notify } from 'notiflix';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private fb:FormBuilder,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { }
  exams = <Exam[]>{};
  exam = <Exam>{};
  teachers = <Teacher[]>{}
  apiBase: string = "http://localhost:3000";
  examId?:number;
  action?:string;
  examForm=this.fb.group({
    name:[this.exam.name,[Validators.required]],
    teacher_id:[this.exam.teacher_id,[Validators.required,Validators.pattern("^[0-9]*$")]],
    pass_mark:[this.exam.pass_mark,[Validators.required]]
  });
  async ngOnInit(): Promise<void> {
    this.http.get<Exam[]>(this.apiBase + "/exams").subscribe(data => this.exams = data);
    this.loadTeachers();
    this.activatedRoute.queryParams.subscribe(params => {

      this.examId = params['id'];
      this.action = params['action'];

      if (this.action !== undefined && this.examId !== undefined) {

        this.http.get<Exam>(this.apiBase + "/exams/" + this.examId).pipe(first()).subscribe((data: Exam) => {
          this.examForm.patchValue(data);
        });

      }

    });
  }
  loadTeachers(){
    this.http.get<Teacher[]>(this.apiBase+"/teachers").subscribe(data=>this.teachers = data);
  }
  onSubmit= ()=>{
    if (this.action !== undefined && this.examId !== undefined) {
      this.http.put<Exam>(this.apiBase + "/exams/" + this.examId, this.examForm.value).subscribe(response => {
        Notify.success("Record has been updated");
        setTimeout(() => {
          window.location.reload();
        }, 3000);

      });
    } else {
      this.http.post<Exam>(this.apiBase + "/exams", this.examForm.value).subscribe(response => {
        Notify.success("Record has been saved");
        setTimeout(() => {
          window.location.reload();
        }, 3000);

      });
    }
  }
  onEditRequest(params:object) {
    Confirm.show(
      'Update Confirm',
      'Are you sure?',
      'Yes',
      'No',
      () => {
        this.router.navigate(['exams'],{queryParams:params});
      }
    );
  }
  onReset = ()=>{

    this.loadTeachers;
    this.router.navigate(['/exams']);
  }
  onDelete = (id:number) => {
    Confirm.show(
      'Delete Confirm',
      'Are you sure?',
      'Yes',
      'No',
      () => {
        this.http.delete<void>(this.apiBase+"/exams/"+id).subscribe(data=>{
          Notify.success("Record has been deleted");
          setTimeout(() => {
            window.location.reload();
          }, 3000);

        });
      }
    );
  }
}

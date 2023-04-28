import { Component, OnInit } from '@angular/core';
import { Student } from '../shared/student';
import { HttpClient } from '@angular/common/http';
import { Exam } from '../shared/exam';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Score } from '../shared/score';
import { Confirm, Notify } from 'notiflix';
import { first } from 'rxjs';

@Component({
  selector: 'app-exam-scores',
  templateUrl: './exam-scores.component.html',
  styleUrls: ['./exam-scores.component.css']
})
export class ExamScoresComponent implements OnInit {
  students = <Student[]>{};
  score? = <Score>{}
  examId?: string|"0";
  student? = <Student>{};
  studentId?:string|"0";
  action?:string;
  exam = <Exam>{};
  apiBase: string = "http://localhost:3000";
  scoreForm =this.formBuilder.group({
    mark:[this.score?.mark,[Validators.required,Validators.max(100),Validators.min(0)]]
  })
  constructor(
    private http: HttpClient,
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private router:Router
  ) { }
  pint(id:string) {
    return parseInt(id);
  }
   ngOnInit(): void {
    this.examId??"0";
     this.activatedRoute.params.subscribe(params => {
      this.examId = params['id'];
   });
    this.http.get<Student[]>(this.apiBase + "/students").subscribe(data => {
      this.students = data
    });

    console.log(this.students);

    this.http.get<Exam>(this.apiBase + "/exams/" + this.examId).subscribe(data => this.exam = data);

    this.activatedRoute.queryParams.subscribe(params => {

      this.studentId = params['id'];
      this.action = params['action'];

      if (this.action !== undefined && this.studentId !== undefined) {

        this.http.get<Student>(this.apiBase + "/students/" + this.studentId).pipe(first()).subscribe((data: Student) => {
          this.student = data;
          this.score  = data.scores?.find((d)=>{
            let sid:string = this.studentId??"0";
            let eid:string = this.examId??"0";
            return  d.student_id===parseInt(sid) && d.exam_id===parseInt(eid);
          });
          this.scoreForm.patchValue(this.score??{});
        });

      }else {
        this.student = <Student>{}
        this.scoreForm.patchValue({});
      }

    });

  }
  onSubmit () {
    if (this.action !== undefined && this.studentId !== undefined && this.examId!==undefined) {
      let d = {...this.scoreForm.value,exam_id:this.examId,student_id:this.studentId};console.log(d);
      this.http.post<Exam>(this.apiBase + "/scores", d).subscribe(response => {
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
        this.router.navigate(['exams',this.examId,'scores'],{queryParams:params});
      }
    );
  }
}

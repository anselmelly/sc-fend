import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Student } from 'src/app/shared/student';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


@Component({
  selector: 'app-students-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient) { }
  student = <Student>{};
  studentId?: string;
  action?: string;
  apiBase:string ="http://localhost:3000";
  studentForm = this.fb.group({
    name: [this.student.name, Validators.required],
    email: [this.student.name, [Validators.required, Validators.email]],
    phone: [this.student.phone, Validators.required],
    student_id: [this.student.student_id, [Validators.required]]
  });
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {

      this.studentId = params['id'];
      this.action = params['action'];

      if (this.action !== undefined && this.studentId !== undefined) {

        this.http.get<Student>(this.apiBase + "/students/" + this.studentId).pipe(first()).subscribe((data: Student) => {
          this.studentForm.patchValue(data);
        });

      }

    });
  }
  onReset=()=> {
    this.studentForm.reset
    this.router.navigate(['students']);
  }
  onSubmit() {
    if (this.action !== undefined && this.studentId !== undefined) {
      this.http.put<Student>(this.apiBase + "/students/" + this.studentId, this.studentForm.value).subscribe(response => {
        Notify.success("Record has been updated");
        setTimeout(() => {
          window.location.reload();
        }, 3000);

      });
    } else {
      this.http.post<Student>(this.apiBase + "/students", this.studentForm.value).subscribe(response => {
        Notify.success("Record has been saved");
        setTimeout(() => {
          window.location.reload();
        }, 3000);

      });
    }
  }

}

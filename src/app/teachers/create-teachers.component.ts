import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Teacher } from '../shared/teacher';


@Component({
  selector: 'app-create-teachers',
  templateUrl: './create-teachers.component.html',
  styleUrls: ['./create-teachers.component.css'],
})
export class CreateTeachersComponent implements OnInit {


  teacher: Teacher = <Teacher>{};

  teacherId?: number
  action?: string

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute
  ) { }
  teacherForm = this.fb.group({
    name: [this.teacher.name, Validators.required],
    email: [this.teacher.email, [Validators.required, Validators.email]],
    phone: [this.teacher.phone, Validators.required],
    staff_id: [this.teacher.staff_id, [Validators.required]]
  });
  ngOnInit(): void {


    this.activatedRoute.queryParams.subscribe(params => {

      this.teacherId = params['id'];
      this.action = params['action'];


      if (this.action !== undefined && this.teacherId !== undefined) {

        this.http.get<Teacher>("http://localhost:3000/teachers/" + this.teacherId).pipe(first()).subscribe((data: Teacher) => {
          this.teacherForm.patchValue(data);

        });

      }

    });



  }

  resetForm = () => {
    this.teacherForm.reset
    this.router.navigate(['teachers']);
  }

  onSubmit() {
    if (this.action !== undefined && this.teacherId !== undefined) {
      this.http.put<Teacher>("http://localhost:3000/teachers/" + this.teacherId, this.teacherForm.value).subscribe(response => {
        Notify.success("Record has been updated");
        setTimeout(() => {
          window.location.reload();
        }, 3000);

      });
    } else {
      this.http.post<Teacher>("http://localhost:3000/teachers", this.teacherForm.value).subscribe(response => {
        Notify.success("Record has been saved");
        setTimeout(() => {
          window.location.reload();
        }, 3000);

      });
    }
  }

}

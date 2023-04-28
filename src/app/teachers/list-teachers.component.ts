import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

@Component({
  selector: 'app-list-teachers',
  templateUrl: './list-teachers.component.html',
  styleUrls: ['./list-teachers.component.css']
})
export class ListTeachersComponent implements OnInit {
  teachers: any;
  constructor(private http: HttpClient,private router: Router) {}
  ngOnInit(): void {
     this.http.get<any>("http://127.0.0.1:3000/teachers").subscribe(data=>{
      this.teachers = data;
    });

  }
  loadEdit(params:object)  {
    Confirm.show(
      ' Update Confirm',
      'Are you sure?',
      'Yes',
      'No',
      () => {
        this.router.navigate(['teachers'],{queryParams:params});
      },
      () => {

      },
    );

  }
  onDelete = (id:number) => {
    Confirm.show(
      ' Delete Confirm',
      'Are you sure?',
      'Yes',
      'No',
      () => {
        this.http.delete<void>("http://localhost:3000/teachers/"+id).subscribe(data=>{
          Notify.success("Record has been deleted");
          setTimeout(() => {
            window.location.reload();
          }, 3000);

        });
      },
      () => {

      },
    );
  }

}

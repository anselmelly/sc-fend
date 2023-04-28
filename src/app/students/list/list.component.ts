import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/shared/student';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Confirm, Notify } from 'notiflix';

@Component({
  selector: 'app-student-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  constructor(private http: HttpClient, private router: Router) { }
  students = <Student[]>{}
  apiBase:string = "http://localhost:3000";
  ngOnInit(): void {
    this.http.get<Student[]>(this.apiBase+'/students').subscribe(response => this.students = response);
  }
  loadEdit=(params:object)  =>{
    Confirm.show(
      ' Update Confirm',
      'Are you sure?',
      'Yes',
      'No',
      () => {
        this.router.navigate(['students'],{queryParams:params});
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
        this.http.delete<void>(this.apiBase+"/students/"+id).subscribe(data=>{
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

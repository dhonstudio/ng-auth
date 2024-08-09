import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: any;

  constructor(
    private _auth: AuthService,
    private _course: CourseService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.user = this._auth.getUser();

    var course = this._course.getCourse().subscribe(res => {
      console.log(res);
    });
  }

  logout(): void {
    this._auth.logout();
    this._router.navigate(['/login']);
  }

}

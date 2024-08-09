import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: any;

  constructor(
    private _auth: AuthService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.user = this._auth.getUser();
    console.log(this.user);
  }

  logout(): void {
    this._auth.logout();
    this._router.navigate(['/login']);
  }

}

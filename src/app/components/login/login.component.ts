import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials = { username: '', password: '' };

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this._auth.login(this.credentials).subscribe(
      (token) => {
        this._auth.saveToken(token);
        this._router.navigate(['/dashboard']); // Navigasi ke halaman dashboard setelah login berhasil
      },
      (error) => {
        alert('Invalid username or password');
      }
    );
  }

}

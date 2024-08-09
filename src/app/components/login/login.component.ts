import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
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
    private _oauth: SocialAuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    if (this._auth.isLoggedIn()) {
      this._router.navigate(['/dashboard']);
    }
  }

  signInWithGoogle(): void {
    this._oauth.signIn(GoogleLoginProvider.PROVIDER_ID).then((user: any) => {
      console.log(user);
      // Lakukan sesuatu dengan data user, misalnya kirim token ke backend
    });
  }

  onSubmit() {
    this._auth.login(this.credentials).subscribe(
      (token) => {
        this._auth.saveToken(token.token);
        this._router.navigate(['/dashboard']); // Navigasi ke halaman dashboard setelah login berhasil
      },
      (error) => {
        alert(error.message);
      }
    );
  }

}

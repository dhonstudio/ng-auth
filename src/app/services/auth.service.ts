import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _apiURL = 'https://localhost:7270';

  constructor(
    private _http: HttpClient
  ) { }

  login(credential: any): Observable<any> {
    return this._http.post(`${this._apiURL}/login`, credential)
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}

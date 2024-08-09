import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _apiURL = 'https://localhost:7270';

  constructor(
    private _http: HttpClient
  ) { }

  login(credential: any): Observable<any> {
    return this._http.post(`${this._apiURL}/login`, credential).pipe(
      catchError(this.handleError)
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  logout() {
    localStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getUser(): any {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken;
    }

    return null
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `${error.error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}

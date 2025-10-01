import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthSuccessResponse } from '../interfaces/auth-success-response';
import { ILoginSuccessResponse } from '../interfaces/login-success-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _httpClient = inject(HttpClient);

  validateUser(): Observable<IAuthSuccessResponse> {
    return this._httpClient.get<IAuthSuccessResponse>('http://localhost:3000/api/protected');
  }

  login(email: string, password: string): Observable<ILoginSuccessResponse> {
    const body = { email, password };

    return this._httpClient.post<ILoginSuccessResponse>(
      'http://localhost:3000/api/users/login',
      body
    );
  }
}

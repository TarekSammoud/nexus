import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../entities/user/user.model';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { SignUp } from '../../entities/user/signup.model';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private baseUrl = 'http://localhost:9000/nexus-backend/auth';
    private userUrl = 'http://localhost:9000/nexus-backend/user';

    constructor(private http: HttpClient, private router: Router) { }

    login(email: string, password: string): Observable<any> {
        const body = { email, password };
        return this.http
            .post<any>(`${this.baseUrl}/login`, body, {
                headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            })
            .pipe(
                catchError((error) => {
                    throw new Error('Invalid credentials or server error');
                })
            );
    }

    register(user: SignUp): Observable<any> {
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        });

        return this.http.post<any>(`${this.baseUrl}/register`, user, { headers });
    }

    isAuthenticated(): boolean {
        return localStorage.getItem('auth_token') !== null;
    }

    logout(): void {
        localStorage.removeItem('auth_token');
        this.router.navigate(['/login']);
    }

    getLoggedInUserProfile(): Observable<User> {
        const userId = TokenService.getUserId();
        if (!userId) throw new Error('User ID not found in token');
        return this.http.get<User>(`${this.userUrl}/getbyid/${userId}`);
    }

    checkEmailUnique(email: string): Observable<boolean> {
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<boolean>(`${this.userUrl}/check-email/${email}`, { headers });
    }







    sendOtp(email: string) {
        return this.http.post(`http://localhost:9000/nexus-backend/auth/forgot-password`, null, {
            params: { email }
        });
    }

    resetPassword(email: string, otp: string, newPassword: string) {
        return this.http.post(`http://localhost:9000/nexus-backend/auth/reset-password`, null, {
            params: { email, otp, newPassword }
        });
    }



}

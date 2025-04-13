import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../entities/user/user.model';
import { map } from 'rxjs/operators';  // Importer map depuis rxjs/operators
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { SignUp } from '../../entities/user/signup.model';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = 'http://localhost:9000/nexus-backend/user/login'; // Mettez l'URL correcte ici

    private apiUrl2 = 'http://localhost:9000/nexus-backend/user/getbyid';



    private baseUrl = 'http://localhost:9000/nexus-backend/auth';

    constructor(private http: HttpClient, private router: Router) { }

    login(email: string, password: string): Observable<any> {
        const body = { email, password };
        return this.http
            .post<any>(`${this.baseUrl}/login`, body, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                }),
            })
            .pipe(
                catchError((error) => {
                    throw new Error('Invalid credentials or server error');
                })
            );
    }

    register(user: SignUp): Observable<any> {
        const token = localStorage.getItem('auth_token');
        const headers = token ? new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }) : new HttpHeaders({
            'Content-Type': 'application/json'
        });

        return this.http
            .post<any>(`${this.baseUrl}/register`, user, { headers });
    }


    isAuthenticated(): boolean {
        return localStorage.getItem('auth_token') !== null;
    }

    logout(): void {
        localStorage.removeItem('auth_token');
        this.router.navigate(['/login']);
    }




    getUserProfile(userId: number): Observable<User> {
        return this.http.get<User>(`${this.apiUrl2}/${userId}`);
    }

    private apiUrl3 = 'http://localhost:9000/nexus-backend/user/check-email';

    checkEmailUnique(email: string): Observable<boolean> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('auth_token')}`);
        return this.http.get<boolean>(`${this.apiUrl3}/${email}`, { headers });
    }


    decodeToken(token: string): any {
        try {
            const payload = token.split('.')[1];
            return JSON.parse(atob(payload));
        } catch (e) {
            console.error('Erreur lors du décodage du token', e);
            return null;
        }
    }

}


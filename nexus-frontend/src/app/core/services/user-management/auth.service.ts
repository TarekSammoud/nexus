import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../../entities/user/user.model';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { SignUp } from '../../entities/user/signup.model';
import { TokenService } from './token.service';
import { HttpParams } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private baseUrl = 'http://localhost:9000/nexus-backend/auth';
    private userUrl = 'http://localhost:9000/nexus-backend/user';



    constructor(private http: HttpClient, private router: Router, private tokenService: TokenService) { }

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
        console.log('Retrieved token:', token);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
        });
        console.log('Request Headers:', headers);  // Vérifier les headers envoyés

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
        return this.http.get<boolean>(`${this.baseUrl}/check-email/${email}`, { headers });
    }

    checkPhoneUnique(phoneNumber: string): Observable<boolean> {
        const token = localStorage.getItem('auth_token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
        return this.http.get<boolean>(`${this.baseUrl}/check-phone/${phoneNumber}`, { headers });
    }

    // Envoi du code OTP par email
    sendOtp(email: string): Observable<any> {
        return this.http.post(`${this.baseUrl}/forgot-password`, null, {
            params: { email }, // Envoi de l'email en tant que paramètre
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        });
    }


    // Réinitialisation du mot de passe
    resetPassword(email: string, otp: string, newPassword: string): Observable<any> {
        const params = new HttpParams()
            .set('email', email)
            .set('otp', otp)
            .set('newPassword', newPassword);

        // Ajout de `responseType: 'text'` pour traiter la réponse en tant que chaîne de caractères
        return this.http.post(`${this.baseUrl}/reset-password`, null, { params, responseType: 'text' });
    }

    facebookLogin(accessToken: string): Observable<any> {
        const params = new HttpParams().set('accessToken', accessToken);
        return this.http.post(`http://localhost:9000/nexus-backend/auth/facebook-login`, null, { params });

    }


    githubLogin(code: string) {
        console.log('Making GitHub login request with code:', code);
        return this.http.post<{ token: string }>('http://localhost:9000/nexus-backend/auth/github-login', {
            code: code
        });

    }




    isLoggedIn(): boolean {
        return this.tokenService.hasToken();  // Tu peux utiliser hasToken() de TokenService
    }

    /**
     * 
     * 
     * 
     */
    private userLoggedInSubject = new BehaviorSubject<boolean>(false);

    // Observable pour abonner le HeaderComponent
    userLoggedIn$ = this.userLoggedInSubject.asObservable();

    // Méthode pour mettre à jour l'état de connexion
    updateUserLoginStatus(isLoggedIn: boolean): void {
        this.userLoggedInSubject.next(isLoggedIn);
    }
}

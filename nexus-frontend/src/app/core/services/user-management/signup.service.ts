// src/app/user-management/user.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../entities/user/user.model';  // Modèle User
import { SignUp } from '../../entities/user/signup.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = `http://localhost:9000/nexus-backend/user/addUser`;  // L'URL de l'API backend

    constructor(private http: HttpClient) { }
    createUser(signUpData: SignUp): Observable<User> {
        const body = {
            firstName: signUpData.firstName,
            lastName: signUpData.lastName,
            email: signUpData.email,
            password: signUpData.password,
            phoneNumber: signUpData.phoneNumber || null,
            address: signUpData.address || null,
            roleType: signUpData.roleType
        };

        return this.http.post<User>(this.apiUrl, body);
    }
    private apiUrl2 = `http://localhost:9000/nexus-backend/user/check-email`;
    // L'URL de l'API backend

    checkEmailUnique(email: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.apiUrl2}/${email}`);
    }


}

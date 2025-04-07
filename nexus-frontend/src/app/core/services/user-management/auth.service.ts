import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../entities/user/user.model';
import { map } from 'rxjs/operators';  // Importer map depuis rxjs/operators

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = 'http://localhost:9000/nexus-backend/user/login'; // Mettez l'URL correcte ici

    private apiUrl2 = 'http://localhost:9000/nexus-backend/user/getbyid';
    constructor(private http: HttpClient) { }



    login(email: string, password: string): Observable<any> {
        const url = `http://localhost:9000/nexus-backend/user/login?email=${email}&password=${password}`;
        return this.http.post<any>(url, {}).pipe(
            map(response => {
                console.log(response); // Affiche la réponse complète dans la console
                if (response && response.id) {
                    return response.id;  // Retourne uniquement l'ID de l'utilisateur
                }
                throw new Error('User not found');
            })
        );
    }



    getUserProfile(userId: number): Observable<User> {
        return this.http.get<User>(`${this.apiUrl2}/${userId}`);
    }

}


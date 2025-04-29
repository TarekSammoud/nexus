import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private userSubject = new BehaviorSubject<any>(null); // Utilisation de BehaviorSubject pour stocker les données de l'utilisateur
    user$ = this.userSubject.asObservable();

    constructor() { }

    // Sauvegarde les informations de l'utilisateur dans le service
    setUser(user: any): void {
        this.userSubject.next(user);
    }

    // Récupère les informations de l'utilisateur depuis le service
    getUser(): any {
        return this.userSubject.value;
    }
}

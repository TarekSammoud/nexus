import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserProfileService {
    private baseUrl = 'http://nexus-backend.backend.svc.cluster.local:9000/nexus-backend/pic';
    private apiUrl = 'http://nexus-backend.backend.svc.cluster.local:9000/nexus-backend/user';

    constructor(private http: HttpClient) { }

    uploadProfilePicture(userId: number, file: File): Observable<HttpEvent<any>> {
        const formData = new FormData();
        formData.append('file', file);
        const req = new HttpRequest('POST', `${this.baseUrl}/uploadProfilePicture/${userId}`, formData, {
            reportProgress: true
        });
        return this.http.request(req);
    }

    getProfilePicture(userId: number): Observable<Blob> {
        return this.http.get(`${this.baseUrl}/profile-picture/${userId}`, { responseType: 'blob' });
    }

    updateUserProfile(user: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/updateUser`, user);
    }

    getUserById(userId: number): Observable<any> {
        return this.http.get(`http://nexus-backend.backend.svc.cluster.local:9000/nexus-backend/user/getbyid/${userId}`);
    }



}

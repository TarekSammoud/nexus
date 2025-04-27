import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserProfileService {
    private baseUrl = 'http://localhost:9000/nexus-backend/pic';
    private apiUrl = 'http://localhost:9000/nexus-backend/user';

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
        return this.http.get(`http://localhost:9000/nexus-backend/user/getbyid/${userId}`);
    }

    private apiUrl3 = 'http://localhost:9000/nexus-backend/api/face-animer'; // adapte selon ton backend



    uploadAvatar(file: File) {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post(`${this.apiUrl3}/upload`, formData);
    }

    getTaskInfo(taskId: string) {
        return this.http.get(`${this.apiUrl3}/task-info/${taskId}`);
    }

    private getallUser = 'http://localhost:9000/nexus-backend/user/allUser';
    getAllUsers(): Observable<any[]> {
        return this.http.get<any[]>(this.getallUser);
    }

}

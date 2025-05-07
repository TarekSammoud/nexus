import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  private ftpUrl= '/api/nexus-backend/games/upload/download/excel'; 

  constructor(private http: HttpClient) { }

  getExcelDataFromFTP(fileName: string): Observable<any> {
        return this.http.get<any>(`${this.ftpUrl}?fileName=${fileName}`);
  }

}

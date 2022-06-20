import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  upload(file: File, data: { [key: string]: string } | null, type: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    if (data) {
      Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    }

    const req = new HttpRequest('POST', `${this.baseUrl}files/upload/${type}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
}

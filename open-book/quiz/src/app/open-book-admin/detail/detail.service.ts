import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BookItem } from '../open-book-admin.type';

@Injectable({
  providedIn: 'root'
})
export class DetailService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getBook(id: number): Observable<{ model: BookItem }> {
    return this.http.get<{ model: BookItem }>(`${this.baseUrl}openbook/${id}`);
  }
}

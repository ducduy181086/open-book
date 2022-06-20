import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { BookItem } from '../open-book-admin.type';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getOpenBook(queryParam: { keyword: string | null | undefined, pageIndex: number | undefined, take: number | undefined }): Observable<{ total: number, items: BookItem[] }> {
    const params = Object.entries({ keyword: queryParam.keyword, pageIndex: queryParam.pageIndex, take: queryParam.take })
      .reduce((seed, [key, value]) => {
        if (value !== undefined && value !== null) return seed.set(key, value);
        return seed;
      }, new HttpParams());
    return this.http.get<{ total: number, items: BookItem[] }>(this.baseUrl + 'openbook', { params });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NlQueryService {
  private apiUrl = 'http://localhost:5000/api/nl-query'; // Backend API

  constructor(private http: HttpClient) {}

  getQueryResult(query: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { query });
  }
}

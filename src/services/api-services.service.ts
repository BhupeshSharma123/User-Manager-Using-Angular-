import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiServicesService {
  constructor(private http: HttpClient) {}

  getData(page: number = 1, perPage: number = 3) {
    const url = `https://reqres.in/api/users?page=${page}&per_page=${perPage}`;
    console.log('page number ', page);
    return this.http.get(url);
  }
  deleteData(id: string) {
    const url = `https://reqres.in/api/users/${id}`;
    return this.http.delete(url);
  }
  updateData(id: string, user: any) {
    const url = `https://reqres.in/api/users/${id}`;
    return this.http.put(url, user);
  }
  addUser(newUser: any) {
    const url = `https://reqres.in/api/users`;
    return this.http.post(url, newUser);
  }
}

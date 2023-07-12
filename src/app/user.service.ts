import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient) { }

  getLoggedInUser(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/login`);
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/${username}`);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/all-users`);
  }

  searchUsers(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/search-users?keyword=${keyword}`);
  }

  startChat(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/message/send-message`, user);
  }
}

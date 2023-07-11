import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class RegisterService {

  private API_USER_ME: string = 'http://localhost:8080/user/register';

  constructor(private http: HttpClient) { }

  register(user: any) {
    console.log(user);
    return this.http.post(this.API_USER_ME, user);
  }

}
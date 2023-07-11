import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private API_USER_ME: string = 'http://localhost:8080/user/login';

  constructor(private http: HttpClient) { }

  /*login(username: string, password: string) {
    const headers = new HttpHeaders(
      {
        authorization : 'Basic ' + btoa(username + ':' + password)
      }
    );
    return this.http.get<Object>(this.API_USER_ME, {headers: headers});
  }*/

  login(username: string, password: string) {
    const body = { username: username, password: password };
    const headers = new HttpHeaders(
      {
        authorization : 'Basic ' + btoa(username + ':' + password)
      }
    );
    return this.http.post(this.API_USER_ME, body, { headers: headers });
  }
}


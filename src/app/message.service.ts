import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private API_USER_ME: string = 'http://localhost:8080/message';

  constructor(private http: HttpClient) { }

  sendMessage(message: any) {
    console.log(message);
    return this.http.post(`${this.API_USER_ME}/send-message`, message);
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  getUserMessages(senderId: number, receiverId: number): Observable<any> {
    const messageData = {
      senderId: { id: senderId },
      receiverId: { id: receiverId }
    };
  
    return this.http.post<any[]>(`${this.API_USER_ME}/messages-between-users`, messageData);
  }
  
}

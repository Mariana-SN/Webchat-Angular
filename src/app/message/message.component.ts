import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  loggedInUser: any;
  userToSendMessage: any;
  messageToSend: string = '';
  messages: any[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private storageService: StorageService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.getLoggedInUser()
      .then(() => this.getUserMessageReceiver())
      .then(() => this.loadUserMessages())
      .catch(error => {
        console.log(error);
      });
  }

  getLoggedInUser(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const encodedCredentials = localStorage.getItem('authorization');
      if (encodedCredentials) {
        const decodedCredentials = atob(encodedCredentials);
        const [username, password] = decodedCredentials.split(':');
        this.userService.getUserByUsername(username).subscribe(
          user => {
            console.log(user);
            this.loggedInUser = user;
            resolve();
          },
          error => {
            reject(error);
          }
        );
      } else {
        reject('As credenciais não estão disponíveis.');
      }
    });
  }

  getUserMessageReceiver(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const receiverUsername = localStorage.getItem('receiver');
      if (receiverUsername) {
        this.userService.getUserByUsername(receiverUsername).subscribe(
          user => {
            console.log(user);
            this.userToSendMessage = user;
            resolve();
          },
          error => {
            reject(error);
          }
        );
      } else {
        reject('O nome do receptor não está disponível.');
      }
    });
  }

  logout() {
    this.storageService.remove('authorization');
    this.router.navigate(['/']);
  }

  goBack() {
    this.storageService.remove('receiver');
    this.router.navigate(['/dashboard']);
  }

  sendMessage() {
    if (this.messageToSend.trim() !== '') {
      const messageData = {
        message: this.messageToSend,
        senderId: this.loggedInUser,
        receiverId: this.userToSendMessage
      }

      this.messageService.sendMessage(messageData).subscribe(
        response => {
          console.log('Mensagem enviada com sucesso.');
          this.messageToSend = '';
          
        },
        error => {
          console.log('Erro ao registrar o usuário:', error);
        }
      );
    } else {
      alert('O CAMPO MENSAGEM PRECISA TER VALOR!');
    }
  }

  loadUserMessages() {
    if (this.loggedInUser && this.userToSendMessage) {

      const messagesData = {
        senderId: { id: this.loggedInUser.id },
        receiverId: { id: this.userToSendMessage.id }
      };

      console.log(messagesData)

      this.messageService.getUserMessages(this.loggedInUser.id, this.userToSendMessage.id).subscribe(
        messages => {
          console.log(messages);
          this.messages = messages;
        },
        error => {
          console.log(error);
        }
      );
    } else {
      console.log('Usuário logado ou destinatário não definido.');
    }
  }
}
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

  constructor(private userService: UserService, private router: Router, private storageService: StorageService, private messageService: MessageService) { }
  
  ngOnInit(): void {
    this.getLoggedInUser();
    this.getUserMessageReceiver();
  }

  getLoggedInUser() {
    const encodedCredentials = localStorage.getItem('authorization');
    if (encodedCredentials) {
      const decodedCredentials = atob(encodedCredentials);
      const [username, password] = decodedCredentials.split(':');
      this.userService.getUserByUsername(username).subscribe(
        user => {
          console.log(user)
          this.loggedInUser = user;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  getUserMessageReceiver() {
    const receiverUsername = localStorage.getItem('receiver');
    if (receiverUsername) {
      this.userService.getUserByUsername(receiverUsername).subscribe(
        user => {
          console.log(user)
          this.userToSendMessage = user;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  logout(){
    this.storageService.remove('authorization');
    this.router.navigate(['/']);
  }

  goBack(){
    this.storageService.remove('receiver');
    this.router.navigate(['/dashboard']);
  }
}

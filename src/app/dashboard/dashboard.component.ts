import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  searchKeyword: string = '';
  loggedInUser: any;

  constructor(private userService: UserService, private router: Router, private storageService: StorageService) { }

  ngOnInit() {
    this.getLoggedInUser();
    this.getUsers();
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

  getUsers() {
    this.userService.getAllUsers().subscribe(
      users => {
        this.users = users.filter(user => user.id !== this.loggedInUser.id);
      },
      error => {
        console.log(error);
      }
    );
  }

  searchUsers() {
    if (this.searchKeyword.trim() !== '') {
      this.userService.searchUsers(this.searchKeyword).subscribe(
        users => {
          this.users = users.filter(user => user.id !== this.loggedInUser.id);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.getUsers();
    }
  }  

  /*startChat(user: any) {
    this.userService.startChat(user).subscribe(
      response => {
        console.log('Conversa iniciada com:', user);
      },
      error => {
        console.log(error);
      }
    );
  }*/

  startChat(username: string){
    this.storageService.set('receiver', username)
    this.router.navigate(['/message']);
  }

  logout(){
    this.storageService.remove('authorization');
    this.router.navigate(['/']);
  }
}
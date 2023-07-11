import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  searchKeyword: string = '';
loggedInUser: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAllUsers().subscribe(
      users => {
        this.users = users;
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
          this.users = users;
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.getUsers();
    }
  }

  startChat(user: any) {
    this.userService.startChat(user).subscribe(
      response => {
        console.log('Conversa iniciada com:', user);
      },
      error => {
        console.log(error);
      }
    );
  }
}
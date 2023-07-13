import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  email: string = '';
  name: string = '';
  username: string = '';
  gender: string = '';
  photo: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private userRegister: RegisterService,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }    

  register() {
    if (this.email && this.name && this.gender && this.photo && this.password && this.confirmPassword && this.username) {
      if (this.password !== this.confirmPassword) {
        alert("A senha e a confirmação de senha não correspondem.");
        return;
      }

      const userData = {
        email: this.email,
        name: this.name,
        username: this.username,
        gender: this.gender,
        photo: this.photo,
        password: this.password,
        confirmPassword: this.confirmPassword
      };

      this.userRegister.register(userData)
        .subscribe(
          response => {
            console.log("Usuário registrado com sucesso.");
            this.router.navigate(['/login']);
          },
          error => {
            console.log("Erro ao registrar o usuário:", error);
          }
        );
    } else {
      alert("Preencha todos os campos!");
    }
  }

  back(){
    this.router.navigate(['/']);
  }
}

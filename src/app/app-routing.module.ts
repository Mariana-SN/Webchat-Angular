import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { AuthenticatedGuard } from './authenticated.guard';
import { MessageComponent } from './message/message.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent,  canActivate: [AuthenticatedGuard]},
  { path: 'message', component: MessageComponent,  canActivate: [AuthenticatedGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

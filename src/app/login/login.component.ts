import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  credentials = {
    email: '',
    password: ''
  };
  errorMessage: string = '';

  constructor(private router: Router) {}

  onLogin(): void {
    // Hardcoded check for valid credentials
    if (this.credentials.email === 'test@gmail.com' && this.credentials.password === '123123') {
      // Navigate to the dashboard upon successful login
      this.router.navigate(['/dashboard']);
    } else {
      // Display an error message for invalid credentials
      this.errorMessage = 'Invalid username or password';
    }
  }
}

import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {AuthService} from "../../services/auth.service";

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

  constructor(private router: Router, private authService: AuthService) {}

  onLogin(): void {
    // Hardcoded check for valid credentials
    const success = this.authService.login(this.credentials.email, this.credentials.password);

    if (success) {
      // Navigate to the dashboard upon successful login
      this.router.navigate(['/employee']);
    } else {
      // Display an error message for invalid credentials
      this.errorMessage = 'Invalid username or password';
    }
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: boolean = false;

  // Hardcoded login for demonstration purposes
  login(email: string, password: string): boolean {
    // Perform actual authentication here (e.g., API call)
    // For simplicity, check against hardcoded values
    if (email === 'test@gmail.com' && password === '123123') {
      this.isLoggedIn = true;
      return true;
    } else {
      this.isLoggedIn = false;
      return false;
    }
  }

  // Hardcoded logout for demonstration purposes
  logout() {
    this.isLoggedIn = false;
  }

  // Check if the user is logged in
  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}

import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isDropdownOpen: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }
  constructor(private router: Router, private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {FormsModule} from "@angular/forms";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {AppModule} from "./app.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, LoginComponent, NavbarComponent, AppModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'employee-app';
  showNavBar: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check the current route and hide the navigation bar on '/hide-nav'
        this.showNavBar = !['/', '/login'].includes(event.url);

      }
    });
  }
}

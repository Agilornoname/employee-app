import { Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {EmployeeDashboardComponent} from "./employee-dashboard/employee-dashboard.component";
import {EmployeeDetailComponent} from "./employee-detail/employee-detail.component";
import {TeamComponent} from "./team/team.component";

export const routes: Routes = [
  {'path': '', component: LoginComponent},
  {'path': 'dashboard', component: EmployeeDashboardComponent},
  {'path': 'employee-detail', component: EmployeeDetailComponent},
  {'path': 'team', component: TeamComponent},
];

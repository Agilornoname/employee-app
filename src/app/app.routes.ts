import {Routes} from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {EmployeeDashboardComponent} from "./pages/employee-dashboard/employee-dashboard.component";
import {EmployeeDetailComponent} from "./pages/employee-detail/employee-detail.component";
import {TeamComponent} from "./pages/team/team.component";
import {AuthGuard} from "./guards/auth.guard";

export const routes: Routes = [
  {'path': '', component: LoginComponent},
  {'path': 'login', component: LoginComponent},
  {'path': 'employee', component: EmployeeDashboardComponent, },
  { path: 'employee-detail/:username', component: EmployeeDetailComponent,  },
  {'path': 'team', component: TeamComponent, },
];

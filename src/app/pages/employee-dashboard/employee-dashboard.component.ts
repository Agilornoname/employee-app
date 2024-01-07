import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AppModule} from "../../app.module";

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    CommonModule,
    AppModule
  ],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent implements OnInit{
  employees = this.employeeService.getEmployees();
  nameFilter = '';
  currentPage = 1;
  itemsPerPage = 10;

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit() {
    this.nameFilter = this.employeeService.getNameFilter();
    this.filteredEmployees;
  }

  get filteredEmployees() {
    const startIdx = (this.currentPage - 1) * this.itemsPerPage;
    const endIdx = startIdx + this.itemsPerPage;
    return this.employeeService.filterByName(this.sortColumn, this.sortDirection).slice(startIdx, endIdx);
  }

  get totalItems(): number {
    return this.employeeService.filterByName(this.sortColumn, this.sortDirection).length;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  filterEmployees(): void {
    this.currentPage = 1;
    this.employeeService.updateNameFilter(this.nameFilter);
  }

  getVisiblePages(): number[] {
    const visiblePages: number[] = [];
    const maxVisiblePages = 3;

    let startPage = Math.max(1, this.currentPage - 1);
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    while (visiblePages.length < maxVisiblePages && startPage <= endPage) {
      visiblePages.push(startPage);
      startPage++;
    }

    return visiblePages;
  }
  // Any other component or event
  addNewEmployee(): void {
    this.router.navigate(['/employee-detail/new']);
  }


  sortDirection: 'asc' | 'desc' = 'asc';
  sortColumn  = 'firstName';

  sortEmployees(column: string) {
    // If clicking on the same column, reverse the sort direction
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // If clicking on a different column, set the new column and default to ascending order
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.filteredEmployees;
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id);
    this.filteredEmployees;
  }
}

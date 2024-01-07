import { Component } from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {EmployeeService} from "./employee.service";
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [
    NavbarComponent, RouterLink,
    FormsModule,
    CommonModule
  ],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent {
  employees = this.employeeService.getEmployees();
  nameFilter = '';
  currentPage = 1;
  itemsPerPage = 10;

  constructor(private employeeService: EmployeeService) {}

  get filteredEmployees() {
    const startIdx = (this.currentPage - 1) * this.itemsPerPage;
    const endIdx = startIdx + this.itemsPerPage;
    return this.employeeService.filterByName(this.nameFilter).slice(startIdx, endIdx);
  }

  get totalItems(): number {
    return this.employeeService.filterByName(this.nameFilter).length;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  filterEmployees(): void {
    this.currentPage = 1;
  }

  generatePageArray(totalPages: number): number[] {
    const pageArray: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pageArray.push(i);
    }
    return pageArray;
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
}

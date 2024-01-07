// employee.service.ts
import { Injectable } from '@angular/core';
import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employees: Employee[] = [];
  private nameFilter: string = '';
  constructor() {
    // Generate 100 dummy data
    for (let i = 1; i <= 100; i++) {
      this.employees.push({
        id: i,
        username: `user${i}`,
        firstName: `FirstName${i}`,
        lastName: `LastName${i}`,
        email: `user${i}@example.com`,
        birthDate: new Date(1990, 0, 1),
        basicSalary: Math.floor(Math.random() * 50000) + 50000,
        status: i % 2 === 0 ? 'Active' : 'Inactive',
        group: this.dummyGroups[i <= 9 ? i : 1],
        description: `Description for user ${i}`,
      });
    }
  }

  getEmployees(): Employee[] {
    return this.employees;
  }

  filterByName(column: string, sortDirection: string) {
    // Apply sorting and filtering logic to the employees array based on the selected column, direction, and name filter
    return this.employees
      .filter(employee =>
        employee.firstName.toLowerCase().includes(this.nameFilter.toLowerCase())
      )
      .sort((a, b) => {
            let valueA = '';
            let valueB = '';

            if(column === 'firstName'){
              valueA = a.firstName.toLowerCase()
              valueB = b.firstName.toLowerCase()
            } else if(column === 'lastName'){
              valueA = a.lastName.toLowerCase()
              valueB = b.lastName.toLowerCase()
            }
        if (valueA < valueB) {
          return sortDirection === 'asc' ? -1 : 1;
        } else if (valueA > valueB) {
          return sortDirection === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      });
  }

  getNameFilter(): string {
    return this.nameFilter;
  }

  updateNameFilter(nameFilter: string): void {
    this.nameFilter = nameFilter;
  }

  getEmployee(username: string): Employee {
    return this.employees.find((employee) => employee.username === username) ?? new Employee();
  }

  editEmployee(updatedEmployee: Employee): void {
    // Check if there's already an employee with the same username and a different ID
    const cloneEmployee = [...this.employees];
    const existingEmployee = cloneEmployee.find(
      (e) => e.username === updatedEmployee.username && e.id !== updatedEmployee.id
    );

    if (existingEmployee) {
      // Use a confirm dialog to ask the user whether to proceed with the update
      alert("user already exist");
      return;
    } else {
      const index = this.employees.findIndex((e) => e.id === updatedEmployee.id);
      if (index !== -1) {
        this.employees[index] = updatedEmployee;
      }
    }
  }

  // Dummy data for the 'group' field
  private dummyGroups: string[] = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E', 'Team F', 'Team G', 'Team H', 'Team I', 'Team J'];

  getDummyGroups(): string[] {
    return this.dummyGroups;
  }


  addEmployee(newEmployee: Employee): void {
    this.employees.push(newEmployee);
  }

  getLatestId(): number {
    return this.employees.reduce((prev, current) => (prev.id > current.id ? prev : current)).id;
  }

  deleteEmployee(employeeId: number): void {
    this.employees = this.employees.filter(emp => emp.id !== employeeId);
  }
}

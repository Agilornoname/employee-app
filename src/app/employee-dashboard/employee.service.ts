// employee.service.ts
import { Injectable } from '@angular/core';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employees: Employee[] = [];

  constructor() {
    // Generate 100 dummy data
    for (let i = 1; i <= 100; i++) {
      this.employees.push({
        username: `user${i}`,
        firstName: `FirstName${i}`,
        lastName: `LastName${i}`,
        email: `user${i}@example.com`,
        birthDate: new Date(1990, 0, 1),
        basicSalary: Math.floor(Math.random() * 50000) + 50000,
        status: i % 2 === 0 ? 'Active' : 'Inactive',
        group: `Group${i % 3 + 1}`,
        description: `Description for user ${i}`,
      });
    }
  }

  getEmployees(): Employee[] {
    return this.employees;
  }

  filterByName(nameFilter: string): Employee[] {
    return this.employees.filter((employee) => {
      const fullName = `${employee.firstName} ${employee.lastName}`;
      return fullName.toLowerCase().includes(nameFilter.toLowerCase());
    });
  }

  getEmployee(username: string): Employee | undefined {
    return this.employees.find((employee) => employee.username === username);
  }

  editEmployee(updatedEmployee: Employee): void {
    const index = this.employees.findIndex((e) => e.username === updatedEmployee.username);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
    }
  }
}

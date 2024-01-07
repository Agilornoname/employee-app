import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeeService} from "../../services/employee.service";
import {Employee} from "../../model/employee.model";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AppModule} from "../../app.module";

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppModule,
  ],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee = new Employee();
  isAddingNewEmployee: boolean = false;
  dummyGroups: string[] = [];
  today: Date = new Date();
  constructor(private route: ActivatedRoute, private router: Router, private employeeService: EmployeeService, private fb: FormBuilder) {
  }
  employeeForm!: FormGroup;
  formSubmitted = false;

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      basicSalary: ['', Validators.required],
      status: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required],
    });


    this.dummyGroups = this.employeeService.getDummyGroups();

    const usernameParam = this.route.snapshot.paramMap.get('username') ?? '';
    if (usernameParam === 'new') {
      this.isAddingNewEmployee = true;
      this.employee = this.initializeNewEmployee();
    } else {

      this.employee = this.employeeService.getEmployee(usernameParam)!;
      console.log(this.employee);
      this.employeeForm.setValue({
        username: this.employee.username,
        firstName: this.employee.firstName,
        lastName: this.employee.lastName,
        email: this.employee.email,
        birthDate: this.employee.birthDate,
        basicSalary: this.employee.basicSalary,
        status: this.employee.status,
        group: this.employee.group,
        description: this.employee.description,
        // ... other values
      });
      this.isAddingNewEmployee = false;
    }
  }

  private initializeNewEmployee(): Employee {
    return {
      id: this.employeeService.getLatestId() + 1,
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      birthDate: new Date(),
      basicSalary: 0,
      status: '',
      group: '', // Initialize to an empty string for the dropdown
      description: '',
    };
  }



  saveEmployee(): void {
    this.formSubmitted = true;
    this.employeeForm.markAllAsTouched();

    if(this.employeeForm.valid){
      console.log('Form submitted:', this.employeeForm.value);
      if (this.isAddingNewEmployee) {
        console.log("creating employee...")
        this.updateFormToEmployee();
        this.employeeService.addEmployee(this.employee);
      } else {
        console.log("updating employee...")
        this.updateFormToEmployee();
        this.employeeService.editEmployee(this.employee);
      }
      this.router.navigate(['/employee']);
    }
  }

  updateFormToEmployee():void{
    this.employee.username = this.employeeForm.get('username')?.value;
    this.employee.firstName = this.employeeForm.get('firstName')?.value;
    this.employee.lastName = this.employeeForm.get('lastName')?.value;
    this.employee.email = this.employeeForm.get('email')?.value;
    this.employee.birthDate = this.employeeForm.get('birthDate')?.value;
    this.employee.basicSalary = this.employeeForm.get('basicSalary')?.value;
    this.employee.status = this.employeeForm.get('status')?.value;
    this.employee.group = this.employeeForm.get('group')?.value;
    this.employee.description = this.employeeForm.get('description')?.value;
  }

  onCancel(): void {
    this.router.navigate(['/employee']);
  }
}

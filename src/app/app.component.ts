import {Component, OnInit} from '@angular/core';
import {Employee} from './employee';
import {EmployeeService} from './employee.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public employees: Employee[] = [];
  public employee: Employee = new Employee(0, '', '', '', '', '', '');
  public searchParam: string = '';

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.log(this.employees);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  addEmployee() {
    this.employeeService.addEmployee(this.employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        this.initializeEmployee();
        const button = document.getElementById('add-close-button');
        // @ts-ignore
        button.click();

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  openEditModal(id: number) {
    this.employeeService.getEmployee(id).subscribe(employeeById => {
      this.employee = employeeById;
    })
    const button = document.getElementById('edit-modal-button');
    // @ts-ignore
    button.click();
  }

  editEmployee() {
    this.employeeService.updateEmployee(this.employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        this.initializeEmployee();
        const button = document.getElementById('edit-close-button');
        // @ts-ignore
        button.click();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  private initializeEmployee() {
    this.employee.id = 0;
    this.employee.name = '';
    this.employee.email = '';
    this.employee.phone = '';
    this.employee.jobTitle = '';
    this.employee.employeeCode = '';
    this.employee.imageUrl = '';
  }

  openDeleteModal(id: number) {
    this.employeeService.getEmployee(id).subscribe(employeeById => {
      this.employee = employeeById;
    })
    const button = document.getElementById('delete-modal-button');
    // @ts-ignore
    button.click();
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.employee.id).subscribe(
      value => {
        this.getEmployees();
        this.initializeEmployee();
        const button = document.getElementById('delete-close-button');
        // @ts-ignore
        button.click();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  searchEmployee() {
    if (this.searchParam == '') {
      this.getEmployees();
      return;
    }
    this.employeeService.getEmployeesWithSearchParam(this.searchParam).subscribe(
      value => {
        this.employees = value;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  closeButtonClicked() {
    this.initializeEmployee();
  }
}

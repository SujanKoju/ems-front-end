import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Employee} from "./employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiServerUrl = 'http://localhost:8080/employees';

  constructor(private http: HttpClient) {
  }

  public getEmployees(): Observable<Employee[]> {
    console.log("CALLING GET EMPLOYEES API");
    return this.http.get<Employee[]>(this.apiServerUrl);
  }

  public getEmployeesWithSearchParam(searchParam: string): Observable<Employee[]> {
    console.log("CALLING GET EMPLOYEES WITH SEARCH PARAM {} API", searchParam);
    return this.http.get<Employee[]>(this.apiServerUrl + '/search-param/' + searchParam);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    console.log("CALLING ADD EMPLOYEES API");
    return this.http.post<Employee>(this.apiServerUrl, employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    console.log("CALLING UPDATE EMPLOYEES API");
    return this.http.put<Employee>(this.apiServerUrl, employee);
  }

  public deleteEmployee(id: number): Observable<void> {
    console.log("CALLING DELETE EMPLOYEES API");
    return this.http.delete<void>(this.apiServerUrl + '/' + id);
  }

  public getEmployee(id: number): Observable<Employee> {
    console.log("CALLING GET EMPLOYEES BY ID API");
    return this.http.get<Employee>(this.apiServerUrl + '/' + id);
  }
}

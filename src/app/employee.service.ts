import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/users';
  isEmployeeData: Subject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  emitEmployeeData(value: any) {
    this.isEmployeeData.next(value);
  }

  get EmployeeData(): BehaviorSubject<any> {
    return this.isEmployeeData as BehaviorSubject<any>;
  }

  getEmployeeList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  addEmployee(data) {
    return this.http.post(`${this.baseUrl}`, data);
  }

  updateEmployee(id, data) {
    return this.http.patch(`${this.baseUrl}/${id}`, data);
  }

  deleteEmployee(id) {
    console.log(`${this.baseUrl}/${id}`);
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

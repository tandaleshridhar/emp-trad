import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEmployeeComponent } from '../delete-employee/delete-employee.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  loading: boolean = false;
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'phone',
    'city',
    'actions',
  ];
  empolyeeData: Employee[];
  constructor(
    private empService: EmployeeService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.getEmployeeList();
    this.empService.getEmployeeList().subscribe(
      (res) => {
        this.empolyeeData = res;
        console.log(this.empolyeeData);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getEmployeeList() {
    this.empService.getEmployeeList().subscribe(
      (res) => {
        this.empolyeeData = res;
        console.log(this.empolyeeData);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editEmployee(data) {
    this.empService.emitEmployeeData(data);
    this.router.navigate(['/editEmployee']);
  }

  deleteEmployee(empId) {
    console.log(empId);
    const dialogRef = this.dialog.open(DeleteEmployeeComponent, {
      width: '30%',
      data: { empId: empId },
    });

    dialogRef.afterClosed().subscribe((data?) =>
      this.empolyeeData.filter((emp) => {
        emp.id !== data;
      })
    );
  }

  close(value: string) {}
}

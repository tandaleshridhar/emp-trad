import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css'],
})
export class DeleteEmployeeComponent implements OnInit {
  deleteId: number;
  constructor(
    private empService: EmployeeService,
    public dialogRef: MatDialogRef<DeleteEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
    this.deleteId = data.empId;
  }

  ngOnInit(): void {}

  closeModal() {
    this.dialogRef.close();
  }

  deleteData() {
    this.empService.deleteEmployee(this.deleteId).subscribe(
      (res) => {
        console.log(res);
        this.dialogRef.close(this.deleteId);
      },
      (error) => {
        console.log(error);
        this.dialogRef.close();
      }
    );
  }
}

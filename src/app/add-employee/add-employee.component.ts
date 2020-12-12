import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  employee: Employee = new Employee();
  submitted: boolean = false;
  empForm: FormGroup;
  heading: string;
  isEditable: boolean = false;
  editEmpID: number;

  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.empForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      street: ['', Validators.required],
      suite: ['', Validators.required],
      city: ['', Validators.required],
      zipcode: ['', Validators.required],
      lat: ['', Validators.required],
      lng: ['', Validators.required],
      phone: ['', Validators.required],
      website: ['', Validators.required],
      cname: ['', Validators.required],
      catchPhrase: ['', Validators.required],
      bs: ['', Validators.required],
    });

    if (this.router.url.indexOf('editEmployee') > -1) {
      this.isEditable = true;
      this.empService.EmployeeData.subscribe((res) => {
        console.log(res);
        this.editEmpID = res.id;
        this.empForm.patchValue({
          name: res.name,
          username: res.username,
          email: res.email,
          phone: res.phone,
          website: res.website,
          street: res.address.street,
          city: res.address.city,
          suite: res.address.suite,
          zipcode: res.address.zipcode,
          lat: res.address.geo.lat,
          lng: res.address.geo.lng,
          cname: res.company.name,
          catchPhrase: res.company.catchPhrase,
          bs: res.company.bs,
        });
      });
    }

    if (this.isEditable) {
      this.heading = 'Edit Employee';
    } else {
      this.heading = 'Create Employee';
    }
  }

  get f() {
    return this.empForm.controls;
  }

  addEmployee() {
    this.submitted = true;
    if (this.empForm.invalid) {
      return;
    }
    let data = this.empForm.value;
    if (this.isEditable) {
      this.empService.updateEmployee(this.editEmpID, data).subscribe(
        (res) => {
          console.log(res);
          this.empForm.reset();
          this.submitted = false;
          this.router.navigate(['/employees']);
        },
        (error) => {
          console.log(error);
          this.submitted = false;
        }
      );
    } else {
      this.empService.addEmployee(data).subscribe(
        (res) => {
          console.log(res);
          this.empForm.reset();
          this.submitted = false;
          this.router.navigate(['/employees']);
        },
        (error) => {
          console.log(error);
          this.submitted = false;
        }
      );
    }
  }
}

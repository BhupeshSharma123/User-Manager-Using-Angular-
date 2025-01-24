import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  addForm!: FormGroup;
  firstNames: string[] = []; // Array to store suggested first names
  lastNames: string[] = []; // Array to store suggested last names

  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      first_name: new FormControl(this.data?.first_name || '', [
        Validators.required,
      ]),
      last_name: new FormControl(this.data?.last_name || '', [
        Validators.required,
      ]),
      email: new FormControl(this.data?.email || '', [
        Validators.required,
        Validators.email,
      ]),
    });

    // Fetch random names from the API
    this.fetchRandomNames();
  }

  // Fetch random names from the Random User Generator API
  fetchRandomNames(): void {
    const apiUrl = 'https://randomuser.me/api/?results=1000'; // Fetch 10 random users
    this.http.get<any>(apiUrl).subscribe(
      (response) => {
        // Extract first and last names from the API response
        this.firstNames = response.results.map((user: any) => user.name.first);
        this.lastNames = response.results.map((user: any) => user.name.last);
      },
      (error) => {
        console.error('Failed to fetch names:', error);
      }
    );
  }

  save(): void {
    if (this.addForm.valid) {
      this.dialogRef.close(this.addForm.value);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}

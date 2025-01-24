import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  imports: [CommonModule, ReactiveFormsModule], // Add ReactiveFormsModule
  styleUrls: ['./edit-user-dialog.component.css'],
})
export class EditUserDialogComponent implements OnInit {
  editForm!: FormGroup; // Define the form group

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Inject user data
    private fb: FormBuilder // Inject FormBuilder
  ) {}

  ngOnInit(): void {
    // Initialize the form with validators
    this.editForm = this.fb.group({
      first_name: new FormControl(this.data.first_name, [Validators.required]),
      last_name: new FormControl(this.data.last_name, [Validators.required]),
      email: new FormControl(this.data.email, [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  // Save the form data
  save(): void {
    if (this.editForm.valid) {
      this.dialogRef.close(this.editForm.value); // Pass updated data back to the parent
    }
  }

  // Close the dialog without saving
  cancel(): void {
    this.dialogRef.close();
  }
}

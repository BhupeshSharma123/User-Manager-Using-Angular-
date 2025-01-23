import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  imports: [MatFormFieldModule, MatInputModule, CommonModule, FormsModule],
})
export class AddUserComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    // Inject user data to populate the form fields in the dialog
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  save(): void {
    this.dialogRef.close(this.data); // Pass updated data back to the parent
  }

  cancel(): void {
    this.dialogRef.close(); // Close without saving
  }
  ngOnInit() {}
}

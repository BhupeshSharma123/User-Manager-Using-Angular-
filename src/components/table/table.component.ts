import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../../services/api-services.service';
import { CommonModule } from '@angular/common';
import { EditUserDialogComponent } from '../models/edit-user-dialog/edit-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../models/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  imports: [CommonModule, FormsModule],
  providers: [ApiServicesService],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  currentSort: string = ''; // Currently sorted column
  isAscending: boolean = true; // Sort direction
  users: any[] = [];
  currentPage: number = 1;
  filteredUsers: any[] = []; // Initialize as empty array
  columnFilters: { [key: string]: string } = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
  };

  constructor(
    private snackBar: MatSnackBar,
    public apiService: ApiServicesService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.apiService.getData(this.currentPage).subscribe((response: any) => {
      this.users = response.data;
      this.filteredUsers = [...this.users]; // Update filteredUsers with new data
      console.log('Fetched data:', this.users);
    });
  }

  // Pagination
  nextPage() {
    this.currentPage++;
    this.fetchData();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchData();
    }
  }

  // Sorting
  sortData(column: string): void {
    if (this.currentSort === column) {
      this.filteredUsers.reverse(); // Reverse if already sorted by this column
    } else {
      this.currentSort = column;
      this.filteredUsers.sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      });
    }
  }

  // Filtering
  applyColumnFilter(column: string, value: string): void {
    this.columnFilters[column] = value.toLowerCase();
    this.filteredUsers = this.users.filter((user) =>
      Object.keys(this.columnFilters).every((key) =>
        this.columnFilters[key]
          ? user[key].toString().toLowerCase().includes(this.columnFilters[key])
          : true
      )
    );
  }

  applyGlobalFilter(searchText: string): void {
    const lowerCaseSearch = searchText.toLowerCase();
    this.filteredUsers = this.users.filter((user) =>
      Object.values(user).some((value: any) =>
        value.toString().toLowerCase().includes(lowerCaseSearch)
      )
    );
  }

  // Edit User
  editUser(user: any) {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '400px',
      data: { ...user }, // Pass a copy of the user data to the dialog
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Update the user data
        const index = this.users.findIndex((u) => u.id === user.id);
        if (index !== -1) {
          this.users[index] = result;
          this.filteredUsers = [...this.users]; // Update filteredUsers
        }
      }
    });
  }

  // Delete User
  openConfirmationDialog(user: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { message: 'Are you sure you want to delete this user?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUser(user);
        this.showToast('User Deleted');
      }
    });
  }

  deleteUser(user: any) {
    this.apiService.deleteData(user.id).subscribe(() => {
      this.users = this.users.filter((u) => u.id !== user.id);
      this.filteredUsers = [...this.users]; // Update filteredUsers
      console.log('User deleted:', user);
    });
  }

  // Show Toast Notification
  showToast(
    message: string,
    action: string = 'Close',
    duration: number = 3000
  ): void {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}

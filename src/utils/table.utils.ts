// table.utils.ts

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServicesService } from '../services/api-services.service';
import { AddUserComponent } from '../components/models/add-user/add-user.component';
import { EditUserDialogComponent } from '../components/models/edit-user-dialog/edit-user-dialog.component';
import { ConfirmationDialogComponent } from '../components/models/confirmation-dialog/confirmation-dialog.component';
import { map } from 'rxjs';

export class TableUtils {
  constructor(
    private snackBar: MatSnackBar,
    public apiService: ApiServicesService,
    private dialog: MatDialog
  ) {}

  // Fetch data from the API
  fetchData(currentPage: number) {
    return this.apiService.getData(currentPage).pipe(
      map((response: any) => {
        console.log('Fetched data:', response.data);
        return response.data; // Return the fetched data
      })
    );
  }

  // Pagination
  nextPage(currentPage: number, fetchData: () => void) {
    currentPage++;
    fetchData();
  }

  previousPage(currentPage: number, fetchData: () => void) {
    if (currentPage > 1) {
      currentPage--;
      fetchData();
    }
  }

  // Sorting
  sortData(column: string, currentSort: string, filteredUsers: any[]) {
    if (currentSort === column) {
      filteredUsers.reverse(); // Reverse if already sorted by this column
    } else {
      currentSort = column;
      filteredUsers.sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      });
    }
  }

  // Filtering
  applyColumnFilter(
    column: string,
    value: string,
    columnFilters: { [key: string]: string },
    users: any[],
    filteredUsers: any[]
  ) {
    columnFilters[column] = value.toLowerCase();
    filteredUsers = users.filter((user) =>
      Object.keys(columnFilters).every((key) =>
        columnFilters[key]
          ? user[key].toString().toLowerCase().includes(columnFilters[key])
          : true
      )
    );
  }

  // Add User
  addUserToTable(
    users: any[],
    filteredUsers: any[],
    showToast: (message: string) => void
  ) {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '400px',
      data: { newUser: {} }, // Pass a copy of the user data to the dialog
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if (result) {
        users.unshift(result); // Add newUser to the beginning of the array
        filteredUsers = [...users]; // Update filteredUsers
        showToast('User Added successfully');
      } else {
        console.log('Dialog was closed without adding a new user');
      }
    });
  }

  // Apply Global Filter
  applyGlobalFilter(searchText: string, users: any[], filteredUsers: any[]) {
    const lowerCaseSearch = searchText.toLowerCase();
    filteredUsers = users.filter((user) =>
      Object.values(user).some((value: any) =>
        value.toString().toLowerCase().includes(lowerCaseSearch)
      )
    );
  }

  // Edit User
  editUser(user: any, users: any[], filteredUsers: any[]) {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '400px',
      data: { ...user }, // Pass a copy of the user data to the dialog
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // Update the user data
        const index = users.findIndex((u) => u.id === user.id);
        if (index !== -1) {
          users[index] = result;
          filteredUsers = [...users]; // Update filteredUsers
        }
      }
    });
  }

  // Delete User
  openConfirmationDialog(
    user: any,
    users: any[],
    filteredUsers: any[],
    showToast: (message: string) => void
  ) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { message: 'Are you sure you want to delete this user?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUser(user, users, filteredUsers);
        showToast('User Deleted');
      }
    });
  }

  deleteUser(user: any, users: any[], filteredUsers: any[]) {
    this.apiService.deleteData(user.id).subscribe(() => {
      users = users.filter((u) => u.id !== user.id);
      filteredUsers = [...users]; // Update filteredUsers
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

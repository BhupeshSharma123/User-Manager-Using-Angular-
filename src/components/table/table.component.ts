import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../../services/api-services.service';
import { CommonModule } from '@angular/common';
import { EditUserDialogComponent } from '../models/edit-user-dialog/edit-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  providers: [ApiServicesService],
  // tslint:disable-next-line:component-selector
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  currentSort: string = ''; // Currently sorted column
  isAscending: boolean = true; // Sort direction

  sortedData!: any[];
  editUser(user: any) {
    this.apiService.updateData(user.id, user);
    this.fetchData();
    console.log(user);

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
        }
      }
    });
  }
  addUser(user: any) {
    this.apiService.addUser(user);
    this.fetchData();
    console.log(user);
  }
  deleteUser(user: any) {
    this.apiService.deleteData(user.id);

    console.log('Delete user:', user);

    this.users = this.users.filter((u) => u.id !== user.id);
  }
  users: any[] = [];
  currentPage: number = 1;

  constructor(
    public apiService: ApiServicesService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.apiService.getData(this.currentPage).subscribe((response: any) => {
      this.users = response.data;
      const usersData = response.data;
      console.log(usersData);
    });
  }

  // Toggle Sorting
  sortData(column: string): void {
    if (this.currentSort === column) {
      // Reverse if already sorted by this column
      this.users.reverse();
    } else {
      // Sort by the selected column
      this.currentSort = column;
      this.users.sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];

        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      });
    }
  }

  // Filtering Data

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
}

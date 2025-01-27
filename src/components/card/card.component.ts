import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '../../services/api-services.service';
import { CommonModule } from '@angular/common';
import { EditUserDialogComponent } from '../models/edit-user-dialog/edit-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../models/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import { AddUserComponent } from '../models/add-user/add-user.component';
import { NlQueryService } from '../../services/query/nl-query.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { RouteService } from '../../services/routing/route.service';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  imports: [RouterOutlet],
})
export class CardComponent implements OnInit {
  currentSort: string = ''; // Currently sorted column
  isAscending: boolean = true; // Sort direction
  users: any[] = [];
  user: any[] = [];
  currentPage: number = 1;
  filteredUsers: any[] = []; // Initialize as empty array
  columnFilters: { [key: string]: string } = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
  };
  pageSize: any;

  constructor(
    private dataService: DataService,
    private router: Router,
    public service: RouteService,

    public apiService: ApiServicesService
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

  viewUser(userId: string) {
    this.router.navigate(['/view/', userId]);
    this.apiService.getSingleUser(userId).subscribe((response: any) => {
      this.user = response.data; // Assign the fetched data to the users array
      console.log('viewUser', this.user);
      this.sendData(this.user);
    });
  }
  sendData(data: any) {
    this.dataService.sendData(data);
    console.log('sendData', data);
  }
}

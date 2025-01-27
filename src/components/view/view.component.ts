import { Component, Input, OnInit } from '@angular/core';
import { ApiServicesService } from '../../services/api-services.service';
import { DataService } from '../../services/data/data.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouteService } from '../../services/routing/route.service';

@Component({
  imports: [CommonModule],
  selector: 'app-view',
  standalone: true,
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  providers: [ApiServicesService], // Provide the service here
})
export class ViewComponent implements OnInit {
  data: any[] = []; // Initialize as empty array

  constructor(private dataService: DataService, public service: RouteService) {
    // Log the initial state of users (empty array)
  }

  // Method to fetch all users

  ngOnInit() {
    this.dataService.data$.subscribe((newData) => {
      this.data.push(newData);
      console.log('single User Data loaded', this.data);
    });
    // Fetch users when the component initializes
  }
  trackById(item: any) {
    return item.id;
  }
  goBack() {
    this.service.navigateTo('card');
  }
  totable() {
    this.service.navigateTo('table');
  }
}

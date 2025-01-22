import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TableComponent } from '../components/table/table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [TableComponent, CommonModule, MatSlideToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'user-manager';
}

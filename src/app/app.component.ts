import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TableComponent } from '../components/table/table.component';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../components/card/card.component';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { ViewComponent } from '../components/view/view.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, MatSlideToggleModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'user-manager';
}

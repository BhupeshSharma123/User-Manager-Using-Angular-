import { Routes } from '@angular/router';
import { TableComponent } from '../components/table/table.component';
import { ViewComponent } from '../components/view/view.component';
import { CardComponent } from '../components/card/card.component';

export const routes: Routes = [
  // Default route to ViewComponent
  { path: '', component: CardComponent },
  { path: 'table', component: TableComponent }, // Route for TableComponent
  { path: 'view/:id', component: ViewComponent },
  { path: 'card', component: CardComponent },
]; // Route for ViewComponent  ];

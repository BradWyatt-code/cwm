import { Routes } from '@angular/router';
import { WorksListComponent } from './components/works-list/works-list.component';
import { WorkDetailComponent } from './components/work-detail/work-detail.component';
import { WorkFormComponent } from './components/work-form/work-form.component';

export const routes: Routes = [
  { path: '', component: WorksListComponent },
  { path: 'work/:id', component: WorkDetailComponent },
  { path: 'add', component: WorkFormComponent },
  { path: 'edit/:id', component: WorkFormComponent },
  { path: '**', redirectTo: '' }
];

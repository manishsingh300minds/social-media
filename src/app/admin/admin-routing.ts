import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminModule } from './admin.module';
import { CreateComponent } from './create/create.component';
import { ListingComponent } from './listing/listing.component';

export const routes: Routes = [
  { path:'', component: AdminComponent, children: [
    { path: '', redirectTo: 'listing', pathMatch: 'full' },
    { path: 'listing', component: ListingComponent},
    { path: 'create', component: CreateComponent},
    { path: 'edit', component: CreateComponent},
  ]},
];

export const components = [AdminComponent];

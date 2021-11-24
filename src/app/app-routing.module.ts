import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from './guard/msal.guard';
import { PublicComponent } from './public/public.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: (): any => import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [MsalGuard]
  },
  { path: 'public', component: PublicComponent},
  { path: '**', component: PublicComponent}
];

export const appRoutingModule = RouterModule.forRoot(routes);

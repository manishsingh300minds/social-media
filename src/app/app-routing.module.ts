import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { MsalGuard } from './msal.guard';
import { PublicComponent } from './public/public.component';
import { RestrictedPageComponent } from './restricted-page/restricted-page.component';

const routes: Routes = [
  // { path:'', redirectTo:'listing', pathMatch: 'full'},
  {  
    path: '',
    loadChildren: (): any => import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [MsalGuard]
  },
  { path: 'auth', component: AuthComponent},
  { path: 'public', component: PublicComponent},
  { path: 'restricted', component: RestrictedPageComponent},
  { path: '**', component: PublicComponent}
];

export const appRoutingModule = RouterModule.forRoot(routes);

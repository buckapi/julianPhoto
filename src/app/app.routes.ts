import { Routes } from '@angular/router';
import { adminGuard } from './admin/admin.guard';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin/admin-login.component';

export const routes: Routes = [
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [adminGuard], data: { section: 'dashboard' } },
  { path: 'admin/services', component: AdminComponent, canActivate: [adminGuard], data: { section: 'services' } },
  { path: 'admin/portfolio', component: AdminComponent, canActivate: [adminGuard], data: { section: 'portfolio' } },
  { path: 'admin/categories', component: AdminComponent, canActivate: [adminGuard], data: { section: 'categories' } },
  { path: 'admin/settings', component: AdminComponent, canActivate: [adminGuard], data: { section: 'settings' } },
];

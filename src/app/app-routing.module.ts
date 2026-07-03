import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CityDetailsComponent } from './pages/city-details/city-details.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { SearchCitiesComponent } from './pages/search-cities/search-cities.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ManageUsersComponent } from './pages/admin/manage-users/manage-users.component';
import { UserDetailsComponent } from './pages/admin/user-details/user-details.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'city/:id', component: CityDetailsComponent },
  { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] },
  { path: 'search-city', component: SearchCitiesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'admin/users', component: ManageUsersComponent, canActivate: [AdminGuard] },
  { path: 'admin/users/:email', component: UserDetailsComponent, canActivate: [AdminGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
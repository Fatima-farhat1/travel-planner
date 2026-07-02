import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CityDetailsComponent } from './pages/city-details/city-details.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { SearchCitiesComponent } from './pages/search-cities/search-cities.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'city/:id', component: CityDetailsComponent },
  { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] },
  { path: 'search-city', component: SearchCitiesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MoviesListComponent} from './movies-list/movies-list.component';


const moviesRoutes: Routes = [
  {path: 'movies', component: MoviesListComponent}
  // {path: 'movies/:id', component: HouseholdDetailsComponent, canActivate: [CanActivateMoviesDetailsService]}
];

@NgModule({
  imports: [
    RouterModule.forChild(moviesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MoviesRoutingModule {}


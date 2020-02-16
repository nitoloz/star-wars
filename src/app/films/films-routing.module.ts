import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MoviesListComponent} from './films-list/films-list.component';


const moviesRoutes: Routes = [
  {path: 'films', component: MoviesListComponent}
  // {path: 'films/:id', component: HouseholdDetailsComponent, canActivate: [CanActivateMoviesDetailsService]}
];

@NgModule({
  imports: [
    RouterModule.forChild(moviesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class FilmsRoutingModule {}


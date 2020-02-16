import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FilmDetailsComponent} from './film-details/film-details.component';
import {CanActivateFilmDetailsService} from './can-activate-film-details.service';
import {FilmsListComponent} from './films-list/films-list.component';


const filmsRoutes: Routes = [
  {path: 'films', component: FilmsListComponent},
  {path: 'films/:id', component: FilmDetailsComponent, canActivate: [CanActivateFilmDetailsService]}
];

@NgModule({
  imports: [
    RouterModule.forChild(filmsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class FilmsRoutingModule {}


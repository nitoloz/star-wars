import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FilmsListComponent} from './films/films-list/films-list.component';
import {FilmDetailsComponent} from './films/film-details/film-details.component';
import {CanActivateFilmDetailsService} from './films/can-activate-film-details.service';

const routes: Routes = [
  {path: 'films', component: FilmsListComponent},
  {path: 'films/:id', component: FilmDetailsComponent, canActivate: [CanActivateFilmDetailsService]},
  {path: '', redirectTo: '/films', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

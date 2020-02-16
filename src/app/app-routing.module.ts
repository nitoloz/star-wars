import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FilmsListComponent} from './films/films-list/films-list.component';
import {FilmDetailsComponent} from './films/film-details/film-details.component';
import {CanActivateFilmDetailsService} from './films/can-activate-film-details.service';
import {CharactersListComponent} from './characters/characters-list/characters-list.component';
import {CharacterDetailsComponent} from './characters/character-details/character-details.component';
import {CanActivateCharacterDetailsService} from './characters/can-activate-character-details.service';

const routes: Routes = [
  {path: 'films', component: FilmsListComponent},
  {path: 'films/:filmId', component: FilmDetailsComponent, canActivate: [CanActivateFilmDetailsService]},
  {path: 'characters', component: CharactersListComponent},
  {path: 'characters/:characterId', component: CharacterDetailsComponent, canActivate: [CanActivateCharacterDetailsService]},
  {path: '**', redirectTo: '/films', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

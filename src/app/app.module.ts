import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatExpansionModule, MatGridListModule,
  MatIconModule, MatPaginatorModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {NavbarComponent} from './navbar/navbar.component';
import {FilmsService} from './films/films.service';
import {CanActivateFilmDetailsService} from './films/can-activate-film-details.service';
import {CharactersService} from './characters/characters.service';
import {FilmDetailsComponent} from './films/film-details/film-details.component';
import {FilmsListComponent} from './films/films-list/films-list.component';
import {CharactersListTableComponent} from './characters/characters-list-table/characters-list-table.component';
import {CommonModule} from '@angular/common';
import {CharacterDetailsComponent} from './characters/character-details/character-details.component';
import {CanActivateCharacterDetailsService} from './characters/can-activate-character-details.service';
import {CharactersListComponent} from './characters/characters-list/characters-list.component';
import {FilmsListTableComponent} from './films/films-list-table/films-list-table.component';
import {LoaderComponent} from './loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FilmDetailsComponent,
    FilmsListComponent,
    FilmsListTableComponent,
    CharactersListComponent,
    CharactersListTableComponent,
    CharacterDetailsComponent,
    LoaderComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatPaginatorModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

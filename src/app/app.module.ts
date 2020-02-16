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
  MatIconModule,
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
import {CharactersListComponent} from './characters/characters-list/characters-list.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FilmDetailsComponent,
    FilmsListComponent,
    CharactersListComponent
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
  ],
  providers: [FilmsService, CharactersService, CanActivateFilmDetailsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

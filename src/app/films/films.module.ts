import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatExpansionModule,
  MatIconModule,
  MatTableModule
} from '@angular/material';
import {CanActivateFilmDetailsService} from './can-activate-film-details.service';
import {FilmDetailsComponent} from './film-details/film-details.component';
import {FilmsRoutingModule} from './films-routing.module';
import {FilmsService} from './films.service';
import {FilmsListComponent} from './films-list/films-list.component';

@NgModule({
  declarations: [
    FilmDetailsComponent,
    FilmsListComponent
  ],
  imports: [
    CommonModule,
    FilmsRoutingModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatDividerModule,
  ],
  providers: [FilmsService, CanActivateFilmDetailsService]
})
export class FilmsModule {
}

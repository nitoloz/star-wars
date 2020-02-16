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
import {CanActivateMoviesDetailsService} from './can-activate-movies-details.service';
import {HouseholdDetailsComponent} from './household-details/household-details.component';
import {MoviesRoutingModule} from './movies-routing.module';
import {MoviesService} from './movies.service';
import {MoviesListComponent} from './movies-list/movies-list.component';

@NgModule({
  declarations: [
    HouseholdDetailsComponent,
    MoviesListComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatDividerModule,
  ],
  providers: [MoviesService, CanActivateMoviesDetailsService]
})
export class MoviesModule {
}

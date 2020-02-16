import {Component, OnInit} from '@angular/core';
import {Film, FilmsService} from '../films.service';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss']
})
export class FilmDetailsComponent implements OnInit {
  film: Film;

  constructor(public filmsService: FilmsService) {
  }

  ngOnInit() {
    this.film = this.filmsService.selectedFilm;
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Film, FilmsService} from '../films.service';

@Component({
  selector: 'app-films-list-table',
  templateUrl: './films-list-table.component.html',
  styleUrls: ['./films-list-table.component.scss']
})

export class FilmsListTableComponent implements OnInit {

  @Input() films: Film[];
  tableColumns = ['title', 'episode_id', 'release_date', 'director', 'producer'];

  constructor(public filmsService: FilmsService,
              private router: Router) {
  }

  ngOnInit() {
  }

  showDetails(film: Film) {
    this.filmsService.selectedFilm = film;
    this.router.navigate(['/films', film.id]);
  }

}

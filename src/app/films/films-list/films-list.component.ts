import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FilmsService, Film} from '../films.service';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent implements OnInit, OnDestroy {
  loading: boolean;
  films: Film[];
  tableColumns = ['title', 'episode_id', 'release_date', 'director', 'producer'];

  constructor(public filmsService: FilmsService,
              private router: Router) {
  }

  ngOnInit() {
    this.loading = true;
    this.filmsService.getFilmsList().subscribe(data => {
      this.films = data;
      this.loading = false;
    });
  }

  ngOnDestroy(){
    this.loading = false;
  }

  showDetails(film: Film) {
    this.loading = true;
    this.filmsService.selectedFilm = film;
    this.router.navigate(['/films', film.id]);
  }

}

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FilmsService, Film} from '../films.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent implements OnInit {

  films: Film[];
  tableColumns = ['title', 'episode_id', 'release_date', 'director', 'producer'];

  constructor(public filmsService: FilmsService,
              private router: Router) {
  }

  ngOnInit() {
    this.filmsService.getData().subscribe(data => this.films = data);
  }

  showDetails(movie: Film) {
    this.filmsService.selectedFilm = movie;
    this.router.navigate(['/films', movie.episode_id]);
  }

}

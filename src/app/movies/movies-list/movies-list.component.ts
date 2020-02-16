import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MoviesService, Movie, SIMULATION_TYPE} from '../movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  movies: Movie[];
  tableColumns = ['title', 'episode_id', 'release_date', 'director', 'producer'];

  constructor(public moviesService: MoviesService,
              private router: Router) {
  }

  ngOnInit() {
    this.moviesService.getData().subscribe(data => this.movies = data);
  }

  showDetails(movie: Movie) {
    this.moviesService.selectedMovie = movie;
    this.router.navigate(['/movies', movie.episode_id]);
  }

}

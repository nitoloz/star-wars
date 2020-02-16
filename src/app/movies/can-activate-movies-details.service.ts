import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Movie, MoviesService} from './movies.service';

@Injectable()
export class CanActivateMoviesDetailsService implements CanActivate {
  constructor(private moviesService: MoviesService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.moviesService.selectedMovie && this.moviesService.selectedMovie.episode_id === route.params.id
      ? true
      : this.moviesService.getData().pipe(
        map((data: Movie[]) => {
          const selectedMovie = data.find(movie => movie.episode_id === route.params.id);
          if (selectedMovie) {
            this.moviesService.selectedMovie = selectedMovie;
            return true;
          } else {
            this.router.navigate(['/mpovies']);
            return false;
          }
        }));
  }
}

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Film, FilmsService} from './films.service';

@Injectable()
export class CanActivateFilmDetailsService implements CanActivate {
  constructor(private filmsService: FilmsService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.filmsService.selectedFilm && this.filmsService.selectedFilm.episode_id === route.params.id
      ? true
      : this.filmsService.getData().pipe(
        map((data: Film[]) => {
          const selectedFilm = data.find(movie => movie.episode_id === route.params.id);
          if (selectedFilm) {
            this.filmsService.selectedFilm = selectedFilm;
            return true;
          } else {
            this.router.navigate(['/films']);
            return false;
          }
        }));
  }
}

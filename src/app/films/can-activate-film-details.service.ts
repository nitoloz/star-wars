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
    return this.filmsService.selectedFilm && this.filmsService.selectedFilm.id === parseInt(route.params.id, 10)
      ? true
      : this.filmsService.getFilm(route.params.id).pipe(
        map((selectedFilm: Film) => {
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

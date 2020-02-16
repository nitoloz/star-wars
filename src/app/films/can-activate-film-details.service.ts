import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Film, FilmsService} from './films.service';
import {Character, CharactersService} from '../characters/characters.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateFilmDetailsService implements CanActivate {
  constructor(private filmsService: FilmsService,
              private charactersService: CharactersService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.filmsService.selectedFilm && this.filmsService.selectedFilm.id === parseInt(route.params.filmId, 10)
      ? this.getCharactersForSelecterFilm()
      : this.filmsService.getFilm(route.params.filmId).pipe(
        catchError(error => {
          this.router.navigate(['/films']);
          return of(false);
        }),
        mergeMap((selectedFilm: Film) => {
          if (selectedFilm) {
            this.filmsService.selectedFilm = selectedFilm;
            return this.getCharactersForSelecterFilm();
          } else {
            this.router.navigate(['/films']);
            return of(false);
          }
        }));
  }

  getCharactersForSelecterFilm(): Observable<boolean> {
    return !!this.filmsService.selectedFilm.charactersData
      ? of(true)
      : this.charactersService.getCharactersByFilm(this.filmsService.selectedFilm).pipe(
        catchError(error => {
          this.router.navigate(['/films']);
          return of(false);
        }),
        map((characters: Character[]) => {
          this.filmsService.selectedFilm.charactersData = characters;
          return true;
        })
      );
  }
}

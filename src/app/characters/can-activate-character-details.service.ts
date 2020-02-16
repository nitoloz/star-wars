import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Film, FilmsService} from '../films/films.service';
import {Character, CharactersService} from './characters.service';

@Injectable()
export class CanActivateCharacterDetailsService implements CanActivate {
  constructor(private filmsService: FilmsService,
              private charactersService: CharactersService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.charactersService.selectedCharacter
    && this.charactersService.selectedCharacter.id === parseInt(route.params.characterId, 10)
      ? this.getFilmsForSelectedCharacter()
      : this.filmsService.getFilm(route.params.characterId).pipe(
        catchError(error => {
          this.router.navigate(['/characters']);
          return of(false);
        }),
        mergeMap((selectedFilm: Film) => {
          if (selectedFilm) {
            this.filmsService.selectedFilm = selectedFilm;
            return this.getFilmsForSelectedCharacter();
          } else {
            this.router.navigate(['/characters']);
            return of(false);
          }
        }));
  }

  getFilmsForSelectedCharacter(): Observable<boolean> {
    return this.filmsService.getFilmsByCharacter(this.charactersService.selectedCharacter).pipe(
      catchError(error => {
        this.router.navigate(['/characters']);
        return of(false);
      }),
      map((films: Film[]) => {
        this.charactersService.selectedCharacter.filmsData = films;
        return true;
      })
    );
  }
}
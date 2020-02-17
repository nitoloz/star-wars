import {TestBed} from '@angular/core/testing';

import {CanActivateFilmDetailsService} from './can-activate-film-details.service';
import {Film, FilmsService} from './films.service';
import {Observable, of, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {Character, CharactersService} from '../characters/characters.service';
import {MockFilmsService} from './films-list/films-list.component.spec';
import {MockCharactersService} from '../characters/characters-list/characters-list.component.spec';

export class MockRouter {
  navigate(path) {
  }
}


let filmsService: FilmsService;
let charactersService: CharactersService;
let router: Router;
describe('CanActivateFilmDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanActivateFilmDetailsService,
        {provide: FilmsService, useClass: MockFilmsService},
        {provide: CharactersService, useClass: MockCharactersService},
        {provide: Router, useClass: MockRouter}
      ]
    });
    filmsService = TestBed.get(FilmsService);
    charactersService = TestBed.get(CharactersService);
    router = TestBed.get(Router);
  });

  it('should return true if selectedFilm and corresponding charactersData is loaded', () => {
    filmsService.selectedFilm =
      {
        title: 'Eposode 1',
        episode_id: 1,
        url: 'https://swapi.co/api/films/1/',
        charactersData: [{id: 1, name: 'Luke'}]
      } as Film;
    const service: CanActivateFilmDetailsService = TestBed.get(CanActivateFilmDetailsService);
    expect(service.canActivate({params: {id: '1'}} as any, null)).toBeTruthy();
  });

  it('should load charactersData if  it`s missing and selectedFilm is loaded', () => {
    spyOn(charactersService, 'getCharactersByFilm').and.returnValue(of([
      {
        name: 'Luke',
        mass: '11',
        url: 'https://swapi.co/api/people/1/'
      } as Character
    ]));
    filmsService.selectedFilm =
      {
        id: 1,
        title: 'Eposode 1',
        episode_id: 1,
        url: 'https://swapi.co/api/films/1/',
        charactersData: null
      } as Film;
    const service: CanActivateFilmDetailsService = TestBed.get(CanActivateFilmDetailsService);
    const resultObservable = service.canActivate({params: {id: '1'}} as any, null) as Observable<boolean>;
    resultObservable.subscribe((result: boolean) => {
      expect(result).toBeTruthy();
      expect(filmsService.selectedFilm.characters.length).toBe(1);
      expect(charactersService.getCharactersByFilm).toHaveBeenCalled();
    });
  });

  it('should return false if there is no film with given id', () => {
    spyOn(router, 'navigate');
    spyOn(filmsService, 'getFilm').and.returnValue(throwError(new Error('Test error')));
    filmsService.selectedFilm = {
      id: 2,
      title: 'Eposode 1',
      episode_id: 1,
      url: 'https://swapi.co/api/films/1/',
      charactersData: null
    } as Film;
    const service: CanActivateFilmDetailsService = TestBed.get(CanActivateFilmDetailsService);
    const resultObservable = service.canActivate({params: {id: '1'}} as any, null) as Observable<boolean>;
    resultObservable.subscribe((result: boolean) => {
      expect(result).toBeFalsy();
      expect(filmsService.selectedFilm.id).toBe(2);
      expect(filmsService.getFilm).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/films']);
    });
  });
});

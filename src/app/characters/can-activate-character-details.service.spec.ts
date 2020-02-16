import {TestBed} from '@angular/core/testing';

import {CanActivateCharacterDetailsService} from './can-activate-character-details.service';
import {Film, FilmsService} from '../films/films.service';
import {Router} from '@angular/router';
import {MockFilmsService} from '../films/films-list/films-list.component.spec';
import {Character, CharactersService} from './characters.service';
import {MockCharactersService} from './characters-list/characters-list.component.spec';
import {Observable, of, throwError} from 'rxjs';

export class MockRouter {
  navigate(path) {
  }
}

let filmsService: FilmsService;
let charactersService: CharactersService;
let router: Router;
describe('CanActivateCharacterDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanActivateCharacterDetailsService,
        {provide: FilmsService, useClass: MockFilmsService},
        {provide: CharactersService, useClass: MockCharactersService},
        {provide: Router, useClass: MockRouter}
      ]
    });
    filmsService = TestBed.get(FilmsService);
    charactersService = TestBed.get(CharactersService);
    router = TestBed.get(Router);
  });

  it('should return true if selectedCharacter and corresponding filmsData is loaded', () => {
    charactersService.selectedCharacter = {
      id: 1,
      name: 'Luke',
      mass: '11',
      url: 'https://swapi.co/api/people/1/',
      filmsData: [{id: 1, title: 'Episode 1'}]
    } as Character;
    const service: CanActivateCharacterDetailsService = TestBed.get(CanActivateCharacterDetailsService);
    expect(service.canActivate({params: {id: '1'}} as any, null)).toBeTruthy();
  });

  it('should load filmsData if  it`s missing and selectedCharacter is loaded', () => {
    spyOn(filmsService, 'getFilmsByCharacter').and.returnValue(of([
      {
        title: 'Eposode 1',
        episode_id: 1,
        url: 'https://swapi.co/api/films/1/'
      } as Film
    ]));
    charactersService.selectedCharacter = {
      id: 1,
      name: 'Luke',
      mass: '11',
      url: 'https://swapi.co/api/people/1/',
      filmsData: null
    } as Character;
    const service: CanActivateCharacterDetailsService = TestBed.get(CanActivateCharacterDetailsService);
    const resultObservable = service.canActivate({params: {id: '1'}} as any, null) as Observable<boolean>;
    resultObservable.subscribe((result: boolean) => {
      expect(result).toBeTruthy();
      expect(charactersService.selectedCharacter.filmsData.length).toBe(1);
      expect(filmsService.getFilmsByCharacter).toHaveBeenCalled();
    });
  });

  it('should return false if there is no character with given id', () => {
    spyOn(router, 'navigate');
    spyOn(charactersService, 'getCharacter').and.returnValue(throwError(new Error('Test error')));
    charactersService.selectedCharacter = {
      id: 2,
      name: 'Luke',
      mass: '11',
      url: 'https://swapi.co/api/people/1/',
      filmsData: null
    } as Character;
    const service: CanActivateCharacterDetailsService = TestBed.get(CanActivateCharacterDetailsService);
    const resultObservable = service.canActivate({params: {id: '1'}} as any, null) as Observable<boolean>;
    resultObservable.subscribe((result: boolean) => {
      expect(result).toBeFalsy();
      expect(charactersService.selectedCharacter.id).toBe(2);
      expect(charactersService.getCharacter).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/characters']);
    });
  });
});

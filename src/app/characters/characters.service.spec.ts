import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {SWAPI_BASE_URL} from '../http.interface';
import {LoaderService} from '../loader/loader.service';
import {HttpClient} from '@angular/common/http';
import {Character, CharactersService} from '../characters/characters.service';
import {Film} from '../films/films.service';

const mockCharacters = [
  {
    name: 'Luke',
    mass: '11',
    url: 'https://swapi.co/api/people/1/'
  },
  {
    name: 'Lea',
    mass: '22',
    url: 'https://swapi.co/api/people/2/'
  }
] as Character[];

const mockFilm = {
  characters: [
    'https://swapi.co/api/people/1/',
    'https://swapi.co/api/people/2/'
  ]
} as Film;

describe('CharactersService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: CharactersService;
  let loaderService: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CharactersService, LoaderService]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(CharactersService);
    loaderService = TestBed.get(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCharactersList', () => {
    it('should return correct response', () => {
      spyOn(loaderService, 'startLoading');

      service.getCharactersList()
        .subscribe(charactersData => {
          expect(charactersData[0].name).toEqual('Luke');
          expect(charactersData[0].mass).toEqual('11');
          expect(charactersData[0].id).toEqual(1);

          expect(charactersData[1].name).toEqual('Lea');
          expect(charactersData[1].mass).toEqual('22');
          expect(charactersData[1].id).toEqual(2);
        });
      const req = httpTestingController.expectOne(`${SWAPI_BASE_URL}/people/?page=1`);
      expect(req.request.method).toEqual('GET');
      req.flush({results: mockCharacters});
      httpTestingController.verify();

      expect(loaderService.startLoading).toHaveBeenCalled();
    });
  });

  describe('getCharacter', () => {
    it('should return correct response', () => {
      spyOn(loaderService, 'startLoading');

      service.getCharacter(1)
        .subscribe(characterData => {
          expect(characterData.name).toEqual('Luke');
          expect(characterData.mass).toEqual('11');
          expect(characterData.id).toEqual(1);
        });
      const req = httpTestingController.expectOne(`${SWAPI_BASE_URL}/people/1`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockCharacters[0]);
      httpTestingController.verify();
      expect(loaderService.startLoading).toHaveBeenCalled();
    });
  });


  describe('getCharactersByFilm', () => {
    it('should return correct response', () => {
      spyOn(loaderService, 'startLoading');

      service.getCharactersByFilm(mockFilm)
        .subscribe(charactersData => {
          expect(charactersData[0].name).toEqual('Luke');
          expect(charactersData[0].mass).toEqual('11');
          expect(charactersData[0].id).toEqual(1);

          expect(charactersData[1].name).toEqual('Lea');
          expect(charactersData[1].mass).toEqual('22');
          expect(charactersData[1].id).toEqual(2);
        });
      const req1 = httpTestingController.expectOne(`${SWAPI_BASE_URL}/people/1/`);
      const req2 = httpTestingController.expectOne(`${SWAPI_BASE_URL}/people/2/`);
      expect(req1.request.method).toEqual('GET');
      expect(req2.request.method).toEqual('GET');
      req1.flush(mockCharacters[0]);
      req2.flush(mockCharacters[1]);
      httpTestingController.verify();
      expect(loaderService.startLoading).toHaveBeenCalled();
    });
  });

});

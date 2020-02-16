import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Film, FilmsService} from './films.service';
import {SWAPI_BASE_URL} from '../http.interface';
import {LoaderService} from '../loader/loader.service';
import {HttpClient} from '@angular/common/http';
import {Character} from '../characters/characters.service';

const mockFilms = [
  {
    title: 'Eposode 1',
    episode_id: 1,
    url: 'https://swapi.co/api/films/1/'
  },
  {
    title: 'Eposode 2',
    episode_id: 2,
    url: 'https://swapi.co/api/films/2/'
  }
] as Film[];

const mockCharacter = {
  films: [
    'https://swapi.co/api/films/1/',
    'https://swapi.co/api/films/2/'
  ]
} as Character;

describe('FilmsService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: FilmsService;
  let loaderService: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FilmsService, LoaderService]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(FilmsService);
    loaderService = TestBed.get(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getFilmsList', () => {
    it('should return correct response', () => {
      spyOn(loaderService, 'startLoading');

      service.filmsList = null;
      service.getFilmsList()
        .subscribe(filmsData => {
          expect(filmsData[0].title).toEqual('Eposode 1');
          expect(filmsData[0].episode_id).toEqual(1);
          expect(filmsData[0].id).toEqual(1);

          expect(filmsData[1].title).toEqual('Eposode 2');
          expect(filmsData[1].episode_id).toEqual(2);
          expect(filmsData[1].id).toEqual(2);
          expect(service.filmsList).toEqual(mockFilms);
        });
      const req = httpTestingController.expectOne(`${SWAPI_BASE_URL}/films`);
      expect(req.request.method).toEqual('GET');
      req.flush({results: mockFilms});
      httpTestingController.verify();

      expect(loaderService.startLoading).toHaveBeenCalled();
    });
  });

  describe('getFilm', () => {
    it('should return correct response', () => {
      spyOn(loaderService, 'startLoading');

      service.filmsList = null;
      service.getFilm(1)
        .subscribe(filmData => {
          expect(filmData.title).toEqual('Eposode 1');
          expect(filmData.episode_id).toEqual(1);
          expect(filmData.id).toEqual(1);
        });
      const req = httpTestingController.expectOne(`${SWAPI_BASE_URL}/films/1`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockFilms[0]);
      httpTestingController.verify();
      expect(loaderService.startLoading).toHaveBeenCalled();
    });
  });


  describe('getFilmsByCharacter', () => {
    it('should return correct response', () => {
      spyOn(loaderService, 'startLoading');

      service.filmsList = null;
      service.getFilmsByCharacter(mockCharacter)
        .subscribe(filmsData => {
          expect(filmsData[0].title).toEqual('Eposode 1');
          expect(filmsData[0].episode_id).toEqual(1);
          expect(filmsData[0].id).toEqual(1);

          expect(filmsData[1].title).toEqual('Eposode 2');
          expect(filmsData[1].episode_id).toEqual(2);
          expect(filmsData[1].id).toEqual(2);
        });
      const req1 = httpTestingController.expectOne(`${SWAPI_BASE_URL}/films/1/`);
      const req2 = httpTestingController.expectOne(`${SWAPI_BASE_URL}/films/2/`);
      expect(req1.request.method).toEqual('GET');
      expect(req2.request.method).toEqual('GET');
      req1.flush(mockFilms[0]);
      req2.flush(mockFilms[1]);
      httpTestingController.verify();
      expect(loaderService.startLoading).toHaveBeenCalled();
    });
  });

});

import {TestBed} from '@angular/core/testing';

import {CanActivateFilmDetailsService} from './can-activate-film-details.service';
import {FilmsService} from './films.service';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';

export class MockRouter {
  navigate(path) {
  }
}

let householdsService: FilmsService;
let router: Router;
describe('CanActivateDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CanActivateFilmDetailsService,
        // {provide: FilmsService, useClass: MockFilmsService},
        {provide: Router, useClass: MockRouter}
      ]
    });
    householdsService = TestBed.get(FilmsService);
    router = TestBed.get(Router);
  });

});

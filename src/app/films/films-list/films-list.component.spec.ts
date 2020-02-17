import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FilmsListComponent} from './films-list.component';
import {Film, FilmsService} from '../films.service';
import {MatTableModule} from '@angular/material';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MockRouter} from '../can-activate-film-details.service.spec';
import {Character} from '../../characters/characters.service';
import {ListResponse} from '../../http.interface';

export class MockFilmsService {
  getFilmsList() {
    return of([]);
  }

  getFilmsByCharacter(character: Character) {
    return of([]);
  }

  getFilm(filmId: number) {
    return of({});
  }
}

let filmsService: FilmsService;
let router: Router;
describe('FilmsListComponent', () => {
  let component: FilmsListComponent;
  let fixture: ComponentFixture<FilmsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule],
      declarations: [FilmsListComponent],
      providers: [
        {provide: FilmsService, useClass: MockFilmsService},
        {provide: Router, useClass: MockRouter}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    filmsService = TestBed.get(FilmsService);
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load films data on init', () => {
    spyOn(filmsService, 'getFilmsList').and.returnValue(of([{id: 1} as Film]));
    component.ngOnInit();
    expect(filmsService.getFilmsList).toHaveBeenCalled();
    expect(component.films).toEqual([{id: 1} as Film]);
  });
});

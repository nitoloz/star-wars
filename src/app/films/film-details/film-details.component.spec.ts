import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FilmDetailsComponent} from './film-details.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Film, FilmsService} from '../films.service';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MockFilmsService} from '../films-list/films-list.component.spec';

describe('FilmDetailsComponent', () => {
  let component: FilmDetailsComponent;
  let fixture: ComponentFixture<FilmDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, MatButtonModule, RouterTestingModule],
      declarations: [FilmDetailsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{provide: FilmsService, useClass: MockFilmsService}]
    })
      .compileComponents();
    const filmService = TestBed.get(FilmsService);
    filmService.selectedFilm = {
      id: 1,
      title: 'Episode 1',
      url: 'https://swapi.co/api/films/1/',
      characters: []
    } as Film;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const filmsService = TestBed.get(FilmsService);
    expect(component).toBeTruthy();
    expect(component.film).toEqual(filmsService.selectedFilm);
  });
});

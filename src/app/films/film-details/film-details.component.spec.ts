import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FilmDetailsComponent} from './film-details.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FilmsService} from '../films.service';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MockFilmsService} from '../films-list-table/films-list-table.component.spec';

describe('HouseholdDetailsComponent', () => {
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

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

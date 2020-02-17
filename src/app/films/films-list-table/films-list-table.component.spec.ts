import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FilmsListTableComponent} from './films-list-table.component';
import {Film, FilmsService} from '../films.service';
import {MatTableModule} from '@angular/material';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MockRouter} from '../can-activate-film-details.service.spec';
import {MockFilmsService} from '../films-list/films-list.component.spec';


let filmsService: FilmsService;
let router: Router;
describe('FilmsListTableComponent', () => {
  let component: FilmsListTableComponent;
  let fixture: ComponentFixture<FilmsListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule],
      declarations: [FilmsListTableComponent],
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
    fixture = TestBed.createComponent(FilmsListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to details page', () => {
    spyOn(router, 'navigate');
    component.showDetails({id: 1} as Film);
    expect(router.navigate).toHaveBeenCalledWith(['/films', 1]);
    expect(filmsService.selectedFilm).toEqual({id: 1} as Film);
  });

});

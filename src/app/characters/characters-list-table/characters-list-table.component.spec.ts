import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CharactersListTableComponent} from './characters-list-table.component';
import {MockRouter} from '../../films/can-activate-film-details.service.spec';
import {FilmsService} from '../../films/films.service';
import {MatTableModule} from '@angular/material';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CharactersService} from '../characters.service';

export class MockCharactersService {

}

let householdsService: FilmsService;
let router: Router;
describe('HouseholdsListComponent', () => {
  let component: CharactersListTableComponent;
  let fixture: ComponentFixture<CharactersListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule],
      declarations: [CharactersListTableComponent],
      providers: [
        {provide: CharactersService, useClass: MockCharactersService},
        {provide: Router, useClass: MockRouter}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    householdsService = TestBed.get(FilmsService);
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load films data', () => {
    spyOn(householdsService, 'getFilmsList').and.callThrough();
    component.ngOnInit();
    expect(householdsService.getFilmsList).toHaveBeenCalled();
  });

  it('should navigate to details page', () => {
    spyOn(router, 'navigate');
    component.showDetails({_id: {$oid: '1'}} as any);
    expect(router.navigate).toHaveBeenCalledWith(['/households', '1']);
  });

});

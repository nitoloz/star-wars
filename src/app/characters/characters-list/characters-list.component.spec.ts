import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CharactersListComponent} from './characters-list.component';
import {MockRouter} from '../../films/can-activate-film-details.service.spec';
import {FilmsService} from '../../films/films.service';
import {MatTableModule} from '@angular/material';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

export class MockHouseholdsService {
  getData() {
    return of([]);
  }
  getHouseholdTypeIcon(){
    return 'person';
  }
}

let householdsService: FilmsService;
let router: Router;
describe('HouseholdsListComponent', () => {
  let component: CharactersListComponent;
  let fixture: ComponentFixture<CharactersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule],
      declarations: [CharactersListComponent],
      providers: [
        {provide: FilmsService, useClass: MockHouseholdsService},
        {provide: Router, useClass: MockRouter}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    householdsService = TestBed.get(FilmsService);
    router = TestBed.get(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersListComponent);
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
    // spyOn(router, 'navigate');
    // component.showDetails({_id: {$oid: '1'}} as any);
    // expect(router.navigate).toHaveBeenCalledWith(['/households', '1']);
  });

});

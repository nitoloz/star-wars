import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FilmsListComponent} from './films-list.component';
import {FilmsService} from '../films.service';
import {MatTableModule} from '@angular/material';
import {of} from 'rxjs';
import {Router} from '@angular/router';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {MockRouter} from '../can-activate-film-details.service.spec';

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
  let component: FilmsListComponent;
  let fixture: ComponentFixture<FilmsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTableModule],
      declarations: [FilmsListComponent],
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
    fixture = TestBed.createComponent(FilmsListComponent);
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

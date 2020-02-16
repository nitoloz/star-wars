import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FilmsService} from './films.service';




//https://medium.com/better-programming/testing-http-requests-in-angular-with-httpclienttestingmodule-3880ceac74cf




describe('HouseholdsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [FilmsService]
  }));

  it('should be created', () => {
    const service: FilmsService = TestBed.get(FilmsService);
    expect(service).toBeTruthy();
  });

  it('should return correct household type icon', () => {
    const service: FilmsService = TestBed.get(FilmsService);
  });
});

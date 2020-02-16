import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CharactersService} from './characters.service';


describe('HouseholdsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [CharactersService]
  }));

  it('should be created', () => {
    const service: CharactersService = TestBed.get(CharactersService);
    expect(service).toBeTruthy();
  });

  it('should return correct household type icon', () => {
    const service: CharactersService = TestBed.get(CharactersService);
  });
});

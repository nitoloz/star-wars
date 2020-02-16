import {Component, OnDestroy, OnInit} from '@angular/core';
import {Character, CharactersService} from '../characters.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit, OnDestroy {
  loading: boolean;
  characters: Character[];

  constructor(public charactersService: CharactersService) {
  }

  ngOnInit() {
    this.loading = true;
    this.charactersService.getCharactersList().subscribe(data => {
      this.characters = data;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.loading = false;
  }

}

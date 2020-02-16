import {Component, OnInit} from '@angular/core';
import {Character, CharactersService} from '../characters.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {
  character: Character;

  constructor(public charactersService: CharactersService) {
  }

  ngOnInit() {
    this.character = this.charactersService.selectedCharacter;
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Character, CharactersService} from '../characters.service';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit {

  @Input() characters: Character[];
  tableColumns = ['name', 'birth_year', 'height', 'mass', 'hair_color', 'skin_color', 'eye_color'];

  constructor(public charactersService: CharactersService,
              private router: Router) {
  }

  ngOnInit() {
  }

  showDetails(character: Character) {
    this.charactersService.selectedCharacter = character;
    this.router.navigate(['/characters', character.id]);
  }

}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Character, CharactersService} from '../characters.service';
import {PageEvent} from '@angular/material';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit, OnDestroy {
  characters: Character[];
  charactersCount: number;
  subscription: Subscription;

  constructor(public charactersService: CharactersService) {
  }

  ngOnInit() {
    this.subscription = this.charactersService.getCharactersList().subscribe(data => {
      this.characters = data.results;
      this.charactersCount = data.count;
    });
  }

  pageData(event: PageEvent) {
    this.subscription = this.charactersService.getCharactersList(event.pageIndex + 1).subscribe(data => {
      this.characters = data.results;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

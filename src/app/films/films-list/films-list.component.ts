import {Component, OnDestroy, OnInit} from '@angular/core';
import {FilmsService, Film} from '../films.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent implements OnInit, OnDestroy {
  films: Film[];
  subscription: Subscription;

  constructor(public filmsService: FilmsService) {
  }

  ngOnInit() {
    this.subscription = this.filmsService.getFilmsList().subscribe(data => {
      this.films = data;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

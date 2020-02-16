import {Component, OnDestroy, OnInit} from '@angular/core';
import {FilmsService, Film} from '../films.service';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent implements OnInit, OnDestroy {
  loading: boolean;
  films: Film[];

  constructor(public filmsService: FilmsService) {
  }

  ngOnInit() {
    this.loading = true;
    this.filmsService.getFilmsList().subscribe(data => {
      this.films = data;
      this.loading = false;
    });
  }

  ngOnDestroy(){
    this.loading = false;
  }

}

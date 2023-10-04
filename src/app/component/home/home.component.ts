import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { DataState } from 'src/app/enum/dataState';

import { ApiResponse } from 'src/app/model/response';
import { FootballService } from 'src/app/service/football.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private footballService: FootballService) { }
  data$!: Observable<{ appState: DataState, response?: ApiResponse, error?: HttpErrorResponse }>;
  readonly DataState = DataState;
  private sub: any;
  league: number = 0;

  ngOnInit(): void {
    console.log(this.league)
    this.checkData();
    if(this.league == 0 || this.league == undefined) {
      this.data$ = of({ appState: DataState.LOADED}), 
      startWith({ appState: DataState.LOADING }),
      catchError((error: HttpErrorResponse) => of({ appState: DataState.ERROR, error }))
    }
    else {
      this.data$ = of({ appState: DataState.LOADED})
      this.getData(this.league, 2023);
    }
  }

  switchLeague(league: string, id: number, season: number) {
    if(league === DataState.ENGLISH) {
      this.getData(id, season);
    }
    if(league === DataState.ITALIAN) {
      this.getData(id, season)
    }
    if(league === DataState.FRENCH) {
      this.getData(id, season);
    }
    if(league === DataState.GERMAN) {
      this.getData(id, season)
    }
    if(league === DataState.SPANISH) {
      this.getData(id, season)
    }
  }

  private getData(id: number, season: number) {
    this.data$ = this.footballService.getData$(id, season).pipe(
      map((response: ApiResponse) => {
        console.log(response);
        return ({ appState: DataState.ENGLISH, response: response })
      }
    ), catchError((error: HttpErrorResponse) => of({ appState: DataState.ERROR, error })))
  }

  checkData() {
    this.sub = this.route.params.subscribe(params => {
      this.league = params['league'];
      console.log(this.league);
    })
  }
}

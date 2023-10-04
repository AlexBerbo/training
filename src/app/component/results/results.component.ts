import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { DataState } from 'src/app/enum/dataState';
import { TeamResponse } from 'src/app/model/team-response';
import { FootballService } from 'src/app/service/football.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private footballService: FootballService) {}
  season: string = '';
  teamId: string = '';
  league: string = '';
  private sub: any;
  state$!: Observable<{ appState: DataState, response?: TeamResponse, error?: HttpErrorResponse }>;
  readonly DataState = DataState;

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.season = params['season'];
      this.league = params['league'];
      this.teamId = params['teamId'];
      console.log(this.teamId, this.league, this.season);
    })
    this.getData();
  }

  private getData() {
    this.state$ = this.footballService.getTeamData$(this.teamId, this.league, this.season).pipe(
      map((response: TeamResponse) => {
        console.log(response);
        return ({ appState: DataState.ENGLISH, response: response })
      }), catchError((error: HttpErrorResponse) => of({ appState: DataState.ERROR, error })))
  }

  goBack() {
    this.router.navigate(['/home', this.league]);
  }
}

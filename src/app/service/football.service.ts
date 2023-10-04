import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../model/response';
import { TeamResponse } from '../model/team-response';

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  private readonly server: string = 'https://v3.football.api-sports.io';
  private readonly host: string = 'x-rapidapi-host';
  private readonly key: string = 'x-rapidapi-key';
  constructor(private http: HttpClient) { }

  getData$ = (id: number, season: number) => <Observable<ApiResponse>>
    this.http.get<ApiResponse>(`${this.server}/standings?league=${id}&season=${season}`,
      { headers: new HttpHeaders().set(this.host, 'v3.football.api-sports.io').set(this.key, '75ca86a90f00a1176e78e81fb050584a') })
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      )

  getTeamData$ = (team: string, league: string, season: string) => <Observable<TeamResponse>>
  this.http.get<TeamResponse>(`${this.server}/fixtures?team=${team}&league=${league}&season=${season}`,
  { headers: new HttpHeaders().set(this.host, 'v3.football.api-sports.io').set(this.key, '75ca86a90f00a1176e78e81fb050584a') })
  .pipe(
    tap(console.log),
    catchError(this.handleError)
  )

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred - ${error.error.message}`;
    } else {
      if (error.error.reason) {
        errorMessage = error.error.reason;
        console.log(error);
      } else {
        errorMessage = `An error occurred, error - ${error.status}`;
      }
    }
    return throwError(() => errorMessage);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Launch } from './launch';
import { Params } from './params';
import { Utils } from './utils';

@Injectable({
  providedIn: 'root'
})
export class LaunchService {
  private launchesUrl = 'https://api.spacexdata.com/v3/launches';

  constructor(private http: HttpClient) {}

  getLaunches(params: Params): Observable<Launch[]> {
    const queryString = Utils.getQueryString(params);
    return this.http.get<Launch[]>(`${this.launchesUrl}?${queryString}`)
      .pipe();
  }
}

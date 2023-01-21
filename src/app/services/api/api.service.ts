import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TeamResponse} from '../../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'x-apisports-key': environment.api.key
    })
  };
  constructor(
    private http: HttpClient
  ) {
  }
  /**
   * Get team from API
   *
   * @param id
   */

  getTeam(stableId: number): Observable<TeamResponse> {
    const url = environment.api.baseUrl + `/teams?id=${stableId}`;
    return this.http.get<TeamResponse>(url, {headers: this.httpOptions.headers});
  }

  /*
  getTeam(): Observable<any> {
    const url = environment.api.baseUrl + `/teams`;
    return this.http.get<any>(url, {headers: this.httpOptions.headers});
  }
  */

}

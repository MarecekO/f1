import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TeamResponse} from '../../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {
  }
  /**
   * Get team from API
   *
   * Attach the header that api requires with the key
   *
   * @param stableId
   */
  getTeam(stableId: number): Observable<TeamResponse> {
    const headers = new HttpHeaders({
      'x-apisports-key': environment.api.key
    });
    const url = environment.api.baseUrl + `/teams?id=${stableId}`;
    return this.http.get<TeamResponse>(url, {headers});
  }

}

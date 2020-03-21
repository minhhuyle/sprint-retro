import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private serverUrl = environment.apiUrl + '/theme/active';

  constructor(private http: HttpClient) { }

  getActivatedTheme() : Observable<any> {
    return this.http.get(this.serverUrl);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  url: string = environment.apiUrl + "/socket";

  constructor(private http: HttpClient) { }

  post(data) {
    return this.http.post(this.url, data).pipe(
      map((data) => { return data; })
    );
  }
}

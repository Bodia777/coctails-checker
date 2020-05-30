import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Drinks } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ServerConnectionService {
  private url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  constructor(private http: HttpClient) { }

  public getFilterList(): Observable<Drinks> {
    // const headers = new HttpHeaders();
    // headers.append('Content-type', 'application/json');
    return this.http.get<Drinks>(this.url);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DrinksCategoryList, DrinksList } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ServerConnectionService {
  private url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  private url2 = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink';

  constructor(private http: HttpClient) { }

  public getFilterList(): Observable<DrinksCategoryList> {
    return this.http.get<DrinksCategoryList>(this.url);
  }
  public getCoctailsList(): Observable<DrinksList> {
    return this.http.get<DrinksList>(this.url2);
  }
}

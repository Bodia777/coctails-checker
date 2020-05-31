import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DrinksCategoryList, DrinksList } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ServerConnectionService {
  public categoriesOfDrinksArray = [];
  public indexOfNewDrinkCategory: number;
  private url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  constructor(private http: HttpClient) {}

  public getFilterList(): Observable < DrinksCategoryList > {
    return this.http.get < DrinksCategoryList > (this.url);
  }

  public getCategoriesList(categoriesArray): void {
    this.categoriesOfDrinksArray = categoriesArray.value.filter((element) => {
        return element !== false;
    });
    if (this.categoriesOfDrinksArray.length) {
        this.indexOfNewDrinkCategory = 0;
    }
  }

  public getDrinksList(): Observable < DrinksList > {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=' + this.categoriesOfDrinksArray[this.indexOfNewDrinkCategory];
    return this.http.get < DrinksList > (url);
  }

  public changeIndexOfNewDrinkCategory() {
    if (this.indexOfNewDrinkCategory < this.categoriesOfDrinksArray.length - 1) {
      this.indexOfNewDrinkCategory ++;
      return true;
    } else {
      return false;
    }

  }
}

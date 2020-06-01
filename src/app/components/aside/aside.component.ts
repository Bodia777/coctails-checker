import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';

import { ServerConnectionService } from 'src/app/services/server-connection.service';
import { DrinksCategoryList } from 'src/app/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit, OnDestroy {
  public loaderChecker = true;
  public phoneSizeChecker = false;
  public filterArr = [];
  private subscriber: Subscription;
  @Output() approveDrinksListCheckerEmitter = new EventEmitter();
  categoriesFormArray = new FormArray([]);

  constructor(private serverConnectionService: ServerConnectionService) { }

  ngOnInit(): void {
    this.getFilterList();
    if (globalThis.innerWidth <= 500) {
      this.phoneSizeChecker = true;
    }
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  public setItemValue(index, name): void {
    if (this.categoriesFormArray.controls[index].value === true) {
      this.categoriesFormArray.controls[index].setValue(name);
    }
  }

  public setCategoriesList(): void {
    this.serverConnectionService.getCategoriesList(this.categoriesFormArray);
    this.approveDrinksListCheckerEmitter.emit(true);
  }

  private getFilterList(): void {
    this.subscriber = this.serverConnectionService.getFilterList()
    .subscribe(
      (data: DrinksCategoryList) => {
        data.drinks.forEach((element) => {
          this.filterArr.push(element.strCategory);
        });
        this.loaderChecker = false;
        this.filterArr.forEach((element) => {
          element = new FormControl(element);
          this.categoriesFormArray.push(element);
        });
      },
      (error) => {
        console.log(error);
      });
  }
}

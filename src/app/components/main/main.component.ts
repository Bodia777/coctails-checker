import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ElementRef, ViewChild, HostListener } from '@angular/core';
import { ServerConnectionService } from 'src/app/services/server-connection.service';
import { DrinksList, Drink } from 'src/app/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  public showCoctailsArrChecker = false;
  public coctailsArr = [];
  public coctailsCategiriesArr = [];
  private scrollTop: number;
  private subscriber: Subscription;
  @Output() cancelDrinksListCheckerEmitter = new EventEmitter();
  @ViewChild('mainContainer', {static: true}) mainContainer: ElementRef;

  constructor(private serverConnectionService: ServerConnectionService) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll($event){
    const headerHeight = 70;
    this.scrollTop = parseInt(globalThis.getComputedStyle(this.mainContainer.nativeElement).height, 10) + headerHeight;
    if (this.serverConnectionService.categoriesOfDrinksArray.length && this.scrollTop ===  globalThis.scrollY + globalThis.innerHeight ) {
      const changeIndexCategoryResult = this.serverConnectionService.changeIndexOfNewDrinkCategory();
      if (changeIndexCategoryResult) {
        this.getCoctailsList();
      }
    }
  }

  @Input() set newDrinkList(value: boolean) {
    if (value && this.serverConnectionService.categoriesOfDrinksArray.length) {
      if (this.coctailsArr.length) {
        this.subscriber.unsubscribe();
        this.coctailsArr = [];
        this.coctailsCategiriesArr = [];
      }
      this.getCoctailsList();
    } else if (value && !this.serverConnectionService.categoriesOfDrinksArray.length) {
      if (this.subscriber) {this.subscriber.unsubscribe(); }
      const myPromise = (new Promise ((res, rej) => {
        this.showCoctailsArrChecker = false;
        this.coctailsArr = [];
        this.coctailsCategiriesArr = [];
        res();
      }));
      // tslint:disable-next-line: no-shadowed-variable
      myPromise.then((value)  => {
        this.cancelDrinksListCheckerEmitter.emit(false);
      });
    }
  }

  private getCoctailsList(): void {
    this.subscriber = this.serverConnectionService.getDrinksList()
    .subscribe(
      (data: DrinksList) => {
        const arr = new Array();
        data.drinks.forEach((element: Drink) => {
          arr.push(element);
        });
        this.coctailsArr.push(arr);
        this.coctailsCategiriesArr.push(
          this.serverConnectionService.categoriesOfDrinksArray[this.serverConnectionService.indexOfNewDrinkCategory]
        );
        this.showCoctailsArrChecker = true;
        this.cancelDrinksListCheckerEmitter.emit(false);
      },
      (error) => {
        console.log(error);
      });
  }
}

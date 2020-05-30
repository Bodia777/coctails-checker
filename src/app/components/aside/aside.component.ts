import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ServerConnectionService } from 'src/app/services/server-connection.service';
import { Drinks } from 'src/app/interfaces';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit, OnDestroy {
  public loaderChecker = true;
  public filterArr = [];
  private subscriber: any;

  constructor(private serverConnectionService: ServerConnectionService) { }

  ngOnInit(): void {
    this.getFilterList();
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  private getFilterList(): void {
    this.subscriber = this.serverConnectionService.getFilterList()
    .subscribe(
      (data: Drinks) => {
        data.drinks.forEach((element) => {
          this.filterArr.push(element.strCategory);
        });
        this.loaderChecker = false;
      },
      (error) => {
        console.log(error);
      });
  }
}

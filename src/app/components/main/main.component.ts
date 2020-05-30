import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServerConnectionService } from 'src/app/services/server-connection.service';
import { DrinksList, Drink } from 'src/app/interfaces';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  private subscriber: any;

  constructor(private serverConnectionService: ServerConnectionService) { }
  public coctailsArr = [];

  ngOnInit(): void {
    this.getCoctailsList();
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

  private getCoctailsList(): void {
    this.subscriber = this.serverConnectionService.getCoctailsList()
    .subscribe(
      (data: DrinksList) => {
        data.drinks.forEach((element: Drink) => {
          this.coctailsArr.push(element);
        });
      },
      (error) => {
        console.log(error);
      });
  }
}

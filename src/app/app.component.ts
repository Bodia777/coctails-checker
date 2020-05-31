import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'coctails-checker';
  public drinksListChecker = false;

  constructor() { }

  public changeDrinksListChecker(value: boolean): void {
    this.drinksListChecker = value;
  }
}

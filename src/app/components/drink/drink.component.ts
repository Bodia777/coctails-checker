import { Component, OnInit, Input } from '@angular/core';
import { Drink } from 'src/app/interfaces';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.scss']
})
export class DrinkComponent implements OnInit {
  @Input() drinkItem: Drink;

  constructor() { }

  ngOnInit(): void {}

}

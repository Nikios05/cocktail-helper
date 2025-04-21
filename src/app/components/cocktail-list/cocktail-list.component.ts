import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICocktailInfo } from '../../services/cocktail.service';
import { NgForOf } from '@angular/common';
import { CocktailCardComponent } from '../cocktail-card/cocktail-card.component';

@Component({
  selector: 'app-cocktail-list',
  imports: [
    NgForOf,
    CocktailCardComponent
  ],
  standalone: true,
  templateUrl: './cocktail-list.component.html',
  styleUrl: './cocktail-list.component.css'
})
export class CocktailListComponent {
  @Input({ required: true }) public cocktailList: ICocktailInfo[] = [];

  @Output() onCocktailId = new EventEmitter<string>();

  public clickCard(id: string) {
    this.onCocktailId.emit(id);
  }
}

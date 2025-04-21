import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Card } from 'primeng/card';
import { ICocktailInfo } from '../../services/cocktail.service';

@Component({
  selector: 'app-cocktail-card',
  imports: [
    Card,
  ],
  standalone: true,
  templateUrl: './cocktail-card.component.html',
  styleUrl: './cocktail-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CocktailCardComponent {
  @Input({ required: true }) public cocktail!: ICocktailInfo;
}

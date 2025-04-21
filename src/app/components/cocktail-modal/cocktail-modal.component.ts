import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CocktailInfoComponent } from '../cocktail-info/cocktail-info.component';
import { ICocktailInfo } from '../../services/cocktail.service';
import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-cocktail-modal',
  imports: [
    CocktailInfoComponent,
    Button,
    Tooltip
  ],
  standalone: true,
  templateUrl: './cocktail-modal.component.html',
  styleUrl: './cocktail-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CocktailModalComponent {
  @Input({ required: true }) public cocktailInfo!: ICocktailInfo;

  @Output() onNewRandomCocktail = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>();


  public newRandomCocktail() {
    this.onNewRandomCocktail.emit();
  }

  public closeModal() {
    this.onClose.emit();
  }
}

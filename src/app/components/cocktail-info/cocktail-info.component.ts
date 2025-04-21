import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICocktailInfo } from '../../services/cocktail.service';
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { Image } from 'primeng/image';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-cocktail-info',
  standalone: true,
  imports: [
    Image,
    NgForOf,
  ],
  templateUrl: './cocktail-info.component.html',
  styleUrl: './cocktail-info.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CocktailInfoComponent {
  @Input({ required: true }) public cocktailInfo!: ICocktailInfo;
}

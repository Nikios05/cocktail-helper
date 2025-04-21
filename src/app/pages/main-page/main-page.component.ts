import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CocktailService, ICocktailInfo } from '../../services/cocktail.service';
import { Button } from 'primeng/button';
import { AsyncPipe, NgIf } from '@angular/common';
import { CardModule } from 'primeng/card';
import { SearchComponent } from '../../components/search/search.component';
import { Router, RouterOutlet } from '@angular/router';
import { CocktailListComponent } from '../../components/cocktail-list/cocktail-list.component';
import { TooltipModule } from 'primeng/tooltip';
import { CocktailModalComponent } from '../../components/cocktail-modal/cocktail-modal.component';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    Button,
    CardModule,
    SearchComponent,
    RouterOutlet,
    CocktailListComponent,
    TooltipModule,
    CocktailModalComponent,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {
  public cocktailList$ = new ReplaySubject<ICocktailInfo[]>(0);
  public randomCocktail$ = new ReplaySubject<ICocktailInfo | null>(0);
  public showEmptyPlaceholder$ = new BehaviorSubject<boolean>(false);
  public loading$ = new BehaviorSubject<boolean>(false);

  constructor(private readonly router: Router, public cocktailService: CocktailService) {}

  public searchCocktail(cocktailName: string) {
    this.loading$.next(true);

    this.cocktailService.searchCocktailByName(cocktailName).subscribe((cocktail: ICocktailInfo[]) => {
      this.cocktailList$.next(cocktail);
      this.showEmptyPlaceholder$.next(!cocktail.length);
      this.loading$.next(false);
    })
  }

  public openCocktail(idDrink: string) {
    this.router.navigate([`cocktail/${idDrink}`])
  }

  public openRandomCocktail() {
    this.cocktailService.getRandomCocktail().subscribe((cocktail: ICocktailInfo) => {
      this.randomCocktail$.next(cocktail);
    })
  }

  public closeModalCocktail() {
    this.randomCocktail$.next(null);
  }
}

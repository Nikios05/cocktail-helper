import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { CocktailService, ICocktailInfo } from '../../services/cocktail.service';
import { ActivatedRoute } from '@angular/router';
import { CocktailInfoComponent } from '../../components/cocktail-info/cocktail-info.component';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-cocktail',
  imports: [
    CocktailInfoComponent,
    AsyncPipe,
    NgIf
  ],
  standalone: true,
  templateUrl: './cocktail.component.html',
  styleUrl: './cocktail.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CocktailComponent implements OnInit {
  public cocktailInfo$ = new ReplaySubject<ICocktailInfo>(1);

  constructor(private readonly route: ActivatedRoute, public cocktailService: CocktailService) {};

  public async ngOnInit() {
    const cocktailId = this.route.snapshot.params['cocktailId'];

    this.cocktailService.getCocktailById(cocktailId).subscribe((v) => {
      this.cocktailInfo$.next(v);
    });
  }
}

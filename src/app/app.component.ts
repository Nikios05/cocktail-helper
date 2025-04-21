import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CocktailService } from './services/cocktail.service';
import { CocktailDbApiService } from './services/theCocktailDbApi.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  standalone: true,
  providers: [
    { provide: CocktailService, useClass: CocktailDbApiService }
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router: Router) {}

  public navigateToMainPage() {
    this.router.navigate([''])
  }
}

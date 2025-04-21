import { Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CocktailComponent } from './pages/cocktail/cocktail.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/main-page/main-page.component').then(
        (m) => m.MainPageComponent
      ),
    data: {
      component: 'MainPageComponent',
    },
  },
  {
    path: 'cocktail/:cocktailId',
    loadComponent: () =>
      import('./pages/cocktail/cocktail.component').then(
        (m) => m.CocktailComponent
      ),
    data: {
      component: 'CocktailComponent',
    },
  },
];

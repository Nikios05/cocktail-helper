import { CocktailApiService, ICocktailInfo } from './cocktail.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map, Observable } from 'rxjs';

interface ITheCocktailDB extends Record<`strIngredient${number}`, string | undefined>{
  idDrink: string;
  strDrink: string;
  strGlass: string;
  strDrinkThumb: string;
  strInstructions: string;
}

class TheCocktailDBAdapter {
  static toICocktailInfo(apiData: ITheCocktailDB): ICocktailInfo {
    const max_ingredients = 15;
    const ingredients: string[] = [];

    for (let i = 1; i <= max_ingredients; i++) {
      const ingredient = apiData[`strIngredient${i}`];
      if (ingredient) {
        ingredients.push(ingredient);
      }
    }

    return {
      id: apiData.idDrink,
      name: apiData.strDrink,
      glassType: apiData.strGlass,
      imgUrl: apiData.strDrinkThumb,
      ingredients,
      instructions: apiData.strInstructions,
    };
  }
}

@Injectable({
  providedIn: 'root'
})
export class CocktailDbApiService extends CocktailApiService {
  private cocktailDbApiUrl = 'https://www.thecocktaildb.com/api/json/v1/1';

  constructor(private http: HttpClient) {
    super();
  }

  public searchCocktailByName(name: string): Observable<ICocktailInfo[]> {
    return this.http.get<{ drinks: ITheCocktailDB[] }>(`${this.cocktailDbApiUrl}/search.php?s=${name}`).pipe(
      map(({ drinks }) => drinks?.map((drink) => TheCocktailDBAdapter.toICocktailInfo(drink)) || [])
    );
  }

  public getCocktailById(cocktailId: string): Observable<ICocktailInfo> {
    return this.http.get<{ drinks: ITheCocktailDB[] }>(`${this.cocktailDbApiUrl}/lookup.php?i=${cocktailId}`).pipe(
      filter((v) => v && !!v.drinks),
      map(({ drinks }) => TheCocktailDBAdapter.toICocktailInfo(drinks[0]))
    );
  }

  public getRandomCocktail(): Observable<ICocktailInfo> {
    return this.http.get<{ drinks: ITheCocktailDB[] }>(`${this.cocktailDbApiUrl}/random.php`).pipe(
      filter((v) => v && !!v.drinks),
      map(({ drinks }) => TheCocktailDBAdapter.toICocktailInfo(drinks[0]))
    );
  }
}

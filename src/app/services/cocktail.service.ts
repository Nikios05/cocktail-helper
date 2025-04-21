import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export abstract class CocktailApiService {
  abstract searchCocktailByName(name: string): Observable<ICocktailInfo[]>;
  abstract getCocktailById(id: string): Observable<ICocktailInfo>;
  abstract getRandomCocktail(): Observable<ICocktailInfo>;
}

export interface ICocktailInfo {
  id: string;
  name: string;
  glassType: string;
  imgUrl: string;
  ingredients: string[];
  instructions: string;
}

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  constructor(private cocktailApiService: CocktailApiService) { }

  public searchCocktailByName(name: string): Observable<ICocktailInfo[]> {
    return this.cocktailApiService.searchCocktailByName(name);
  }

  public getCocktailById(cocktailId: string): Observable<ICocktailInfo> {
    return this.cocktailApiService.getCocktailById(cocktailId);
  }

  public getRandomCocktail(): Observable<ICocktailInfo> {
    return this.cocktailApiService.getRandomCocktail();
  }
}

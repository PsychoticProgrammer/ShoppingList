import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MealIngredient } from '../DTO/MealIngredient';

@Injectable({
  providedIn: 'root'
})
export class MealIngredientService {

  private serviceUrl = `http://${environment.SERVICES_HOST_IP}/ShoppingList/services/mealIngredients.php`; 

  constructor(private http: HttpClient){

  }

  public getIngredients(mealId: number){
    return this.http.get<any>(this.serviceUrl + "?action=all&mealId=" + mealId);
  }

  public getMatchingIngredients(mealId: number, matchingWord: string){
    return this.http.get<any>(this.serviceUrl + `?action=match&mealId=${mealId}&matchingWord=${matchingWord}`);
  }

  public insertIngredients(ingredients: MealIngredient[]){
    return this.http.post<any>(this.serviceUrl, ingredients);
  }

  public updateIngredient(ingredientNewInfo: any){
    return this.http.put<any>(this.serviceUrl, ingredientNewInfo);
  }

  public deleteIngredient(mealId: number, ingredientId: number){
    return this.http.delete<any>(this.serviceUrl + `?mealId=${mealId}&ingredientId=${ingredientId}`);
  }
}
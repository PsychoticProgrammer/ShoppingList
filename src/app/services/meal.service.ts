import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  serviceUrl = `http://${environment.SERVICES_HOST_IP}/ShoppingList/services/meal.php`;

  constructor(private http: HttpClient) { }

  public getMeals(){
    return this.http.get<any>(this.serviceUrl + "?action=all");
  }

  public getMatchingMeals(matchingWord: string){
    return this.http.get<any>(this.serviceUrl + "?action=match&matchingWord=" + matchingWord);
  }

  public getMeal(id: number){
    return this.http.get<any>(this.serviceUrl + "?action=one&id=" + id);
  }

  public insertMeal(mealInfo: any){
    return this.http.post<any>(this.serviceUrl, mealInfo);
  }

  public updateMeal(mealNewInfo: any){
    return this.http.put<any>(this.serviceUrl, mealNewInfo);
  }

  public deleteMeal(mealId: number){
    return this.http.delete<any>(this.serviceUrl + "?id=" + mealId);
  }
}

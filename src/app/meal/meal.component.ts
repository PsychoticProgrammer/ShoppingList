import { Component, OnInit } from '@angular/core';
import { Meal } from '../DTO/Meal';
import { MealService } from '../services/meal.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent  implements OnInit {

  meals: Meal[] = [];
  existData: boolean = false;
  existMatches: boolean = false;

  constructor(private mealService: MealService) {
    this.loadMeals();
  }

  ngOnInit() {}

  ionViewWillEnter(){
    this.loadMeals();
  }

  private loadMeals(){
    this.mealService.getMeals().subscribe(serverAnswer => {
      this.existData = serverAnswer.lenght != 0;
      this.existMatches = true;
      this.meals = serverAnswer;
    });
  }

  search(event: any){
    const searchWord = event.target.value.trim().toLowerCase();
    if(searchWord != ''){
      this.mealService.getMatchingMeals(searchWord).subscribe(serverAnswer => {
        this.existMatches = serverAnswer.length != 0;
        this.existData = true;
        this.meals = serverAnswer;
      });
      return;
    }
    this.loadMeals();
  }

  clearSearch(){
    this.loadMeals();
  }

  reloadMeals(){
    this.loadMeals();
  }
}

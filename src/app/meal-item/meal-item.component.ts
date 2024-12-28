import { booleanAttribute, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { Meal } from '../DTO/Meal';
import { MealService } from '../services/meal.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-meal-item',
  templateUrl: './meal-item.component.html',
  styleUrls: ['./meal-item.component.scss'],
})
export class MealItemComponent  implements OnInit {

  @Input() meal: Meal;
  @Input() index: number;
  @ViewChild(IonModal) modal: IonModal;
  isModalOpen: boolean = false;
  isConfirmModalOpen: boolean = false;

  name: string = "";
  alias: string = "";
  type: string = "";

  @Output() removedMeal = new EventEmitter<any>();

  constructor(private router: Router,
    private utils: UtilsService,
    private mealService: MealService){
    
  }

  ngOnInit(){
    this.name = this.meal.name;
    this.alias = this.utils.placeAliasCommas(
      [this.emptyToNull(this.meal.alias1),
      this.emptyToNull(this.meal.alias2),
      this.emptyToNull(this.meal.alias3)]);
    this.type = this.meal.type;
  }

  goToMealDetail(){
    this.router.navigate(["meal/" + this.meal.id]);
  }

  setType(event: any){
    this.type = event.target.value;
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.open_close_modal();
  }

  editMeal(){
    const alias = this.alias.split(",");
    this.meal.name = this.name;
    this.meal.alias1 = this.utils.convertToEmptyString(alias[0]);
    this.meal.alias2 = this.utils.convertToEmptyString(alias[1]);
    this.meal.alias3 = this.utils.convertToEmptyString(alias[2]);
    this.meal.type = this.type;

    this.mealService.updateMeal(this.meal).subscribe();
    
    this.open_close_modal();
  }

  removeMeal(){
    this.mealService.deleteMeal(this.meal.id).subscribe(() => {
      this.removedMeal.emit();
    });
  }

  open_close_modal(){
    if(!this.isModalOpen){
      this.name = this.meal.name;
      this.alias = this.utils.placeAliasCommas([this.meal.alias1,this.meal.alias2, this.meal.alias3]);      
    }
    this.isModalOpen = !this.isModalOpen;
  }

  open_close_confirm_modal(){
    this.isConfirmModalOpen = !this.isConfirmModalOpen;
  }

  checkAlias(event: KeyboardEvent){
    //44 es la coma
    const charCode = event.key.charCodeAt(0);
    if(charCode == 32 || charCode == 66){
      return;
    }
    // Valida que no se pueda poner nada que no sea alfanumérico al principio
    if(!this.alias && !this.isAlphaNumeric(event.key.charAt(0))){
      event.preventDefault();
      return;
    }
    //valida las comas
    if(this.alias && charCode == 44){
      //Valida un máximo de 2 Comas
      if((this.alias.match(/,/g) || []).length == 2){
        event.preventDefault();
        return;
      }
      // Valida que no se ponga una coma al lado de otra
      if(!this.isAlphaNumeric(this.alias[this.alias.length - 1])){
        event.preventDefault();
        return;
      }
      return;
    }
    //valida que sean caracteres alfanuméricos
    if(!this.isAlphaNumeric(event.key.charAt(0))){
      event.preventDefault();
    }
  }

  isAlphaNumeric(value: string): boolean{
    const patron = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9]+$/;
    if (patron.test(value)) {
      return true;
    }
    return false;
  }

  getAlias(){
    return this.utils.placeAliasCommas([this.emptyToNull(this.meal.alias1) ,
      this.emptyToNull(this.meal.alias2),
      this.emptyToNull(this.meal.alias3)]);
  }

  private emptyToNull(value : any){
    return value == "" ? null : value;
  }
}

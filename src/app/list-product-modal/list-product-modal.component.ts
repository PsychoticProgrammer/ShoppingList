import { booleanAttribute, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AlertController, IonModal } from '@ionic/angular';
import { ListProductService } from '../services/list-product.service';
import { MealIngredientService } from '../services/meal-ingredient.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-list-product-modal',
  templateUrl: './list-product-modal.component.html',
  styleUrls: ['./list-product-modal.component.scss'],
})
export class ListProductModalComponent  implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  @Input({ transform: booleanAttribute }) isOpen: boolean; 
  @Input({transform: booleanAttribute}) isList: boolean
  @Input() listMealProduct!: any;

  @Output() closedModal = new EventEmitter<any>();
  @Output() editedInfo = new EventEmitter<any>();

  isAlertOpen: boolean = false;
  alertButtons = [
    {
      text: "Aceptar",
      handler: () => {
        this.isAlertOpen = false;
      }
    }
  ]

  quantity: any = "";
  measurement: any = "";
  brand: any = "";
  estimatedCost: any = "";

  constructor(private utils: UtilsService,
    private listProductService: ListProductService,
    private ingredientService: MealIngredientService,
    private alertController: AlertController) {
    
  }

  ngOnInit(){
    /*Inicializa las propiedades de los input text en función del producto que tenga.*/
    this.quantity = this.listMealProduct.quantity?.toString();
    this.measurement = this.utils.convertMeasurement(this.listMealProduct.measurement?.toString(),this.listMealProduct.measurementUnit);
    this.brand = this.utils.convertToEmptyString(this.listMealProduct.brand?.toString());
    this.estimatedCost = this.listMealProduct.estimatedCost?.toString();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Formato Incorrecto',
      subHeader: 'En el campo "Cantidad"',
      message: `La cantidad debe verse así: "número  medida". Ejemplos: "200 ml", "1.5 lts", "100 gr"`,
      buttons: [
        {
          text: "Aceptar",
          handler: () => {
            this.isAlertOpen = false;
          }
        }
      ]
    });

    await alert.present();
  }

  async editListProduct(){

    if(this.measurement && (!this.measurement.includes(" ") || this.measurement.split(" ")[1] == "")){
      await this.presentAlert();
      this.isAlertOpen = true;
      return;
    }

    const measurementInfo = this.utils.divideMeasurement(this.measurement);

    /*Reasigna al producto las cantidades y valores  */
    this.listMealProduct.quantity = this.quantity != null ? parseInt(this.quantity) : 1;
    this.listMealProduct.measurement = measurementInfo[0] != null ? parseFloat(measurementInfo[0]) : null;
    this.listMealProduct.measurementUnit = measurementInfo[1];
    this.listMealProduct.brand = this.brand;
    this.listMealProduct.estimatedCost = this.estimatedCost != null ? parseFloat(this.estimatedCost) : null;

    /*Dado que este componente se usa también en las recetas, se realizará una validación
    antes de ejecutar la operación de actualización, para que vaya a listProduct, o a MealIngredient
    De igual modo, dado que se usa cuando la lista existe y cuando no, se debe validar que la lista exista para 
    mandar a hacer el cambio en la base de datos. Esto se verifica si existe un id de Lista.*/
    if(this.isList && this.listMealProduct.listId != null){
      this.listProductService.updateListProduct(this.listMealProduct).subscribe(() => {
        this.editedInfo.emit();
        this.closeModal();
      });
      return;
    } else if(!this.isList && this.listMealProduct.mealId != null){
      this.ingredientService.updateIngredient(this.listMealProduct).subscribe(() => {
        this.closeModal();
      });
      return;
    }

    this.closeModal();
  }

  closeModal(){
    this.modal.dismiss(null, 'cancel');
    this.closedModal.emit();
  }

  checkMeasurementUnit(event: any){
    if(this.measurement && this.measurement.includes(" ")){
      const measurement = event.target.value.split(" ");
      if(measurement[1] == "$" || measurement[1].toLowerCase() == "usd" ){
        this.estimatedCost = measurement[0];
      }
    }
  }

  checkMeasurementFormat(event: KeyboardEvent){
    // Valida que no se pueda poner un espacio 32 o punto 46 al principio
    if(!this.measurement && (event.key.charCodeAt(0) == 32 || event.key.charCodeAt(0) == 46)){
      event.preventDefault();
      return;
    }

    // Controla que solo se pueda poner 1 punto y que hayan 2 decimales
    if(this.measurement && this.measurement.includes(".") && !this.measurement.includes(" ")){
      if(this.measurement.includes(".") && event.key.charCodeAt(0) == 46){
        event.preventDefault();
        return;
      }
      // Valida que no se pueda ingresar mas de 2 decimales
      // excepto el backspace o borrado
      if(this.measurement.split(".")[1].length == 2 && event.key.charCodeAt(0) != 66 && event.key.charCodeAt(0) != 32){
        event.preventDefault();
        return;
      }
    }

    // Controla que una vez insertado el espacio, solo se pueda ingresar letras.
    if(this.measurement && this.measurement.includes(" ")){
      // Valida que no se pueda ingresar mas de 3 caracteres alfabéticos
      // excepto el backspace o borrado y el espacio
      if(this.measurement.split(" ")[1].length == 3 && event.key.charCodeAt(0) != 66){
        event.preventDefault();
        return;
      }
      this.onlyLetters(event);
      return;
    }

    /*66 es el ascii del backspace o la tacla de borrad y 32 es el espacio y 46 el punto*/
    this.onlyNumbers(event,[32,46,66]);
  }

  checkEstimatedCostFormat(event: KeyboardEvent){
    //Valida que no se pueda poner puntos al principio del input
    if(!this.estimatedCost && event.key.charCodeAt(0) == 46){
      event.preventDefault();
      return;
    }
    //Valida Formato Decimal
    if(this.estimatedCost){
      this.isValidDecimal(event,this.estimatedCost);
    }
    this.onlyNumbers(event,[46,66]);
  }

  /*En este caso, no se han utilizado caracteres especiales, dado que no se requieren mas
  que 3 letras, descontando la ñ y Ñ así como tildes. Se preservan para posteriores proyectos donde si sean
  necesarias estas validaciones */
  private onlyLetters(event: KeyboardEvent) : void{
    let asciiCode : number = event.key.charCodeAt(0);
    //209 y 241 son la ñ y Ñ respectivamente. Los demás son las vocales tildadas
    //let allowedSpecialCharacters : number[] = [225,233,237,243,250,209,241];

    if((asciiCode >= 65 && asciiCode <= 90) || 
    (asciiCode >= 97 && asciiCode <= 122) || asciiCode == 36 /*|| 
    this.isValidSpecialChar(allowedSpecialCharacters,asciiCode)*/){
      return;
    }

    event.preventDefault();
  }

  onlyNumbers(event: KeyboardEvent, allowedSpecialCharacters: number[]) : void{
    const asciiCode = parseInt(event.key.charAt(0));
    if(isNaN(asciiCode) && !this.isValidSpecialChar(allowedSpecialCharacters,event.key.charCodeAt(0))){
      event.preventDefault();
    }
  }

  private isValidSpecialChar(allowedSpecials : number[], keyCode : number) : boolean{
    for(let i = 0; i < allowedSpecials.length; i++){
      if(keyCode == allowedSpecials[i]){
        return true;
      }
    }
    return false;
  }

  private isValidDecimal(event: KeyboardEvent, value: string): void{
    //Solo puede existir un punto
    if(value.includes(".") && event.key.charCodeAt(0) == 46){
      event.preventDefault();
      return;
    }
    // Valida que no se pueda ingresar mas de 2 decimales
    // excepto el backspace o borrado
    if(value.includes(".") && value.split(".")[1].length == 2 && event.key.charCodeAt(0) != 66){
      event.preventDefault();
    }
  } 
}

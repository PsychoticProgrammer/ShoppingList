import { Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { IonList } from '@ionic/angular';
import { ListProduct } from '../DTO/ListProduct';
import { ListModeObserverService } from '../services/list-mode-observer.service';
import { ListProductService } from '../services/list-product.service';
import { ListService } from '../services/list.service';
import { QuickProductCreationService } from '../services/quick-product-creation.service';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss'],
})
export class ListFormComponent  implements OnInit {

  newListProducts: ListProduct[] = [];
  resetUsedMeals: boolean = true;
  existData: boolean = false;
  existMatches: boolean = true;

  isErrorAlertOpen: boolean = false;
  acceptAlertButton = ["Aceptar"];
  errorDescription: string = "";

  listName: string = "";

  @ViewChild('list') list: any;

  constructor(private router: Router,
    private listService: ListService,
    private listProductService: ListProductService,
    private listModeObserver: ListModeObserverService,
    private quickCreation: QuickProductCreationService) {
    
  }

  ngOnInit() {}

  ionViewWillEnter(){
    /*Si se viene de una creación rápida, se reasignan los productos nuevos, que ya contienen el nuevo producto */
    if(this.quickCreation.isQuickCreation){
      this.newListProducts = this.quickCreation.getSavedProducts();
      this.addedProduct();
    }
  }

  goToProductForm(){
    this.quickCreation.goToQuickProductCreation("list",'list-form',this.newListProducts);
  }

  removeFromList(productInfo: any){
    this.newListProducts.splice(this.newListProducts.findIndex(product => {
      return product.productId == productInfo.productId && product.mealId == productInfo.mealId
    }),1);
    if(this.newListProducts.length == 0){
      this.existData = false;
      this.existMatches = false;
      this.resetUsedMeals = true;
    }
  }

  removeMeal(mealProductsToDelete: any){
    mealProductsToDelete.forEach((mealIngredient: any) => {
      this.newListProducts.splice(this.newListProducts.findIndex(product => {
        return product.productId == mealIngredient.ingredientId && product.mealId == mealIngredient.mealId
      }),1);
      this.existData = this.newListProducts.length != 0;
    });
  }

  saveList(){
    if(this.listName == ""){
      this.isErrorAlertOpen = true;
      this.errorDescription = "Debe Proporcionar un Nombre para la Lista";
      return;
    }
    this.listService.insertList({name: this.listName}).subscribe(serverAnswer => {
      this.newListProducts.forEach(listProduct => {
        listProduct.listId = serverAnswer.listId;
      });
      this.listProductService.insertListProducts(this.newListProducts).subscribe(() => {
        this.listModeObserver.createList();
        this.router.navigate(['list/' + serverAnswer.listId]);
      });
    });
  }

  closeAlert(){
    this.isErrorAlertOpen = false;
  }

  addedProduct(){
    this.existData = true;
    this.existMatches = true;
    this.resetUsedMeals = false;
    setTimeout(() => {
      this.list.scrollToBottom(300);
    },100);
  }
}

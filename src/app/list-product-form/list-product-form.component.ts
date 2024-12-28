import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListProduct } from '../DTO/ListProduct';
import { ListProductService } from '../services/list-product.service';
import { QuickProductCreationService } from '../services/quick-product-creation.service';

@Component({
  selector: 'app-list-product-form',
  templateUrl: './list-product-form.component.html',
  styleUrls: ['./list-product-form.component.scss'],
})
export class ListProductFormComponent  implements OnInit {

  newProducts: ListProduct[] = [];
  listId: number;
  resetUsedMeals: boolean = true;
  existData: boolean = false;
  existMatches: boolean = true;

  alreadyChosenProducts: ListProduct[] = [];

  @ViewChild('list') list: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private listProductService: ListProductService,
    private quickCreation: QuickProductCreationService){
    this.listId = parseInt(this.route.snapshot.paramMap.get("id")!);
    this.loadAlreadyChosenProducts();
  }

  ngOnInit(){
    
  }

  ionViewWillEnter(){
    /*Si se viene de una creación rápida, se reasignan los productos nuevos, que ya contienen el nuevo producto,
    y además se aumenta este producto que está en la última posición, al vector de productos que no están disponibles */
    if(this.quickCreation.isQuickCreation){
      this.newProducts = this.quickCreation.getSavedProducts();
      this.alreadyChosenProducts.push(this.newProducts[this.newProducts.length - 1]);
      this.addedProduct();
    }
  }

  goToProductForm(){
    const lastPage = "list-product-form/" + this.listId;
    this.quickCreation.goToQuickProductCreation("list",lastPage,this.newProducts);
  }

  loadAlreadyChosenProducts(){
    this.listProductService.getListProducts(this.listId).subscribe(serverAnswer => {
      this.alreadyChosenProducts = serverAnswer;
    });
  }

  removeFromList(productInfo: any){
    this.newProducts.splice(this.newProducts.findIndex( product => {
      return product.productId == productInfo.productId && product.mealId == productInfo.mealId
    }),1);
    this.alreadyChosenProducts.splice(this.alreadyChosenProducts.findIndex(product => {
      return product.productId == productInfo.productId && product.mealId == productInfo.mealId
    }),1);
    if(this.newProducts.length == 0){
      this.existData = false;
      this.existMatches = false;
      this.resetUsedMeals = true;
    }
  }

  saveListNewProducts(){
    this.listProductService.insertListProducts(this.newProducts).subscribe(() => {
      this.router.navigate(["list/" + this.listId]);
    });
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

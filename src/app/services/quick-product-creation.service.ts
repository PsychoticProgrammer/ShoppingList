import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ListProduct } from '../DTO/ListProduct';
import { MealIngredient } from '../DTO/MealIngredient';
import { Product } from '../DTO/Product';

@Injectable({
  providedIn: 'root'
})
export class QuickProductCreationService {

  private newInfo: any[] = [];
  private quickCreation: boolean = false;
  private lastPage: string = "";
  private type: string = "";

  constructor(private router: Router) { }

  get isQuickCreation(){
    return this.quickCreation;
  }

  getLastPage(){
    return this.lastPage;
  }

  goToQuickProductCreation(type: string, lastPage: string, lastPageInfo: any[]){
    this.type = type;
    this.lastPage = lastPage;
    this.quickCreation = true;
    this.newInfo = lastPageInfo;
    this.router.navigate(['product-form']);
  }

  private addPrduct(product: Product){
    if(this.type == "list"){
      this.newInfo.push(new ListProduct(null,product.id,product.name, this.emptyToNull(product.alias1),
      this.emptyToNull(product.alias2), this.emptyToNull(product.alias3),this.emptyToNull(product.image),1,
      null,null,this.emptyToNull(product.brand),null,null,null,0));
    }else if(this.type == "meal"){
      this.newInfo.push(new MealIngredient(null,product.id,product.name,this.emptyToNull(product.alias1),
      this.emptyToNull(product.alias2), this.emptyToNull(product.alias3),
      this.emptyToNull(product.image),1,null,null,this.emptyToNull(product).brand,null,null));
    }
  }

  quitQuickProductCreation(product: Product){
    this.addPrduct(product);
    this.router.navigate([this.lastPage]);
    this.type = "";
    this.lastPage = "";
  }

  getSavedProducts(){
    const newInfo = [...this.newInfo];
    this.newInfo = [];
    this.quickCreation = false;
    return newInfo;
  }

  private emptyToNull(value: any){
    return value == "" ? null : value
  }
}

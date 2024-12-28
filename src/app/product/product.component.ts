import { Component, OnInit } from '@angular/core';
import { Product } from '../DTO/Product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent  implements OnInit {

  products: Product[] = [];
  existData: boolean = false;
  existMatches: boolean = true;

  constructor(private productService: ProductService) {
    this.loadProducts();
  }

  ngOnInit() {}

  ionViewWillEnter(){
    this.loadProducts();
  }

  private loadProducts(){
    this.productService.getProducts().subscribe(serverAnswer => {
      this.existData = serverAnswer.length != 0;
      this.existMatches = true;
      this.products = serverAnswer;
    });
  }

  search(event: any){
    const searchWord = event.target.value.trim().toLowerCase();
    if(searchWord != ''){
      this.productService.getMatchingProducts(searchWord).subscribe(serverAnswer => {
        this.existMatches = serverAnswer.length != 0;
        this.existData = true;
        this.products = serverAnswer;
      });
      return;
    }
    this.loadProducts()
  }

  clearSearch(){
    this.loadProducts();
  }

  reloadProducts(){
    this.loadProducts();
  }

}

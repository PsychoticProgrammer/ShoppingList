import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../DTO/Product';
import { ProductService } from '../services/product.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent  implements OnInit {

  @Input() product: Product;
  isConfirmModalOpen: boolean = false;
  isImageViewerOpen: boolean = false;

  @Output() removedProduct = new EventEmitter<any>();

  constructor(private router: Router,
    private productService: ProductService,
    private utils: UtilsService) { }

  ngOnInit() {}

  open_close_confirm_modal(){
    this.isConfirmModalOpen = !this.isConfirmModalOpen;
  }

  editProduct(){
    this.router.navigate(["product-form/" + this.product.id]);
  }

  removeProduct(){
    this.productService.deleteProduct(this.product.id).subscribe(() => {
      this.removedProduct.emit();
    });
  }

  open_close_ImageViewer(){
    this.isImageViewerOpen = !this.isImageViewerOpen;
  }

  getAlias(){
    return this.utils.placeAliasCommas([this.product.alias1,this.product.alias2,this.product.alias3]);
  }
}

import { booleanAttribute, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListProduct } from '../DTO/ListProduct';
import { ListProductService } from '../services/list-product.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-list-product-item',
  templateUrl: './list-product-item.component.html',
  styleUrls: ['./list-product-item.component.scss'],
})
export class ListProductItemComponent  implements OnInit {

  @Input({ transform: booleanAttribute }) isListCreated: boolean;
  @Input() listStatus: string;
  @Input() listProduct: ListProduct;
  @Input() listProductInfo: {} 
  isModalOpen: boolean = false;
  isConfirmModalOpen : boolean = false;

  pressStartTime: any;

  isImageViewerOpen: boolean = false;

  @Output() removedProduct  = new EventEmitter<any>();
  @Output() chosenProduct = new EventEmitter<any>();
  @Output() refreshedListCost = new EventEmitter<any>();

  constructor(private listProductService: ListProductService,
    private utils: UtilsService) {
    
  }

  ngOnInit() {}

  // setProductImage

  isListProductEditable(){
    return this.listStatus == 'O' || this.listStatus == 'NC';
  }

  chooseProduct(){
    this.listProduct.status = this.listProduct.status == 'P' ? 'B' : 'P';

    const productInfo = {
      listId: this.listProduct.listId,
      productId: this.listProduct.productId,
      status: this.listProduct.status,
      mealId: this.listProduct.mealId
    };

    this.listProductService.updateListProductStatus(productInfo).subscribe(() => {
      setTimeout(() => {
        this.chosenProduct.emit({productId: this.listProduct.productId, mealId: this.listProduct.mealId});
      }, 250);
    });
  }

  removeProduct(){
    if(this.isListCreated){
      this.listProductService.deleteListProduct(this.listProduct.listId,
        this.listProduct.productId, this.listProduct.mealId).subscribe(() => {
        this.removedProduct.emit(0);
      });
      return;
    }
    this.removedProduct.emit({productId: this.listProduct.productId, mealId: this.listProduct.mealId});
  }

  open_close_modal(){
    this.isModalOpen = !this.isModalOpen;
  }

  open_close_confirm_modal(){
    if(this.isListCreated){
      this.isConfirmModalOpen = !this.isConfirmModalOpen;
      return;
    }
    this.removeProduct();
  }

  refreshList(){
    this.refreshedListCost.emit();
  }

  isChecked(){
    return this.listProduct.status == 'B' ? true : false;
  }

  startTimer(){
    this.pressStartTime = Date.now();
  }

  stopTimer(){
    if((Date.now() - this.pressStartTime) > 1500){
      this.isConfirmModalOpen = true;
      return;
    }
    this.isModalOpen = true;
  }

  preventContextMenu(ev: any){
    ev.preventDefault();
  }

  open_close_ImageViewer(){
    this.isImageViewerOpen = !this.isImageViewerOpen;
  }

  getAlias(){
    return this.utils.placeAliasCommas([this.listProduct.alias1,this.listProduct.alias2,this.listProduct.alias3]);
  }

  isNotNull(value: any){
    return value != null ? true : false;
  }
}

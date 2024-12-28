import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../DTO/Product';
import { ProductService } from '../services/product.service';
import { QuickProductCreationService } from '../services/quick-product-creation.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent  implements OnInit {
  
  private productId: string | null;
  titleText: string = "";
  buttonText: string = "";
  buttonAction: any;

  isErrorAlertOpen: boolean = false;
  acceptAlertButton = ["Aceptar"];
  errorDescription: string = "";

  isToastOpen: boolean = false;
  toastDuration: number = 1000;

  name: string = "";
  alias: string = "";
  brand: string = "";
  image: string = "";

  constructor(private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private utils: UtilsService,
    private quickCreation: QuickProductCreationService){
    this.productId = this.route.snapshot.paramMap.get("id");
    this.initValues();
  }

  ngOnInit() {}

  closeAlert(){
    this.isErrorAlertOpen = false;
  }

  getLastPage(){
    if(this.quickCreation.getLastPage() == ""){
      return "product";
    }
    return this.quickCreation.getLastPage();
  }

  initValues(){
    if(this.productId != null){
      this.titleText = "Editar";
      this.buttonText = "Guardar Cambios";
      this.buttonAction = this.editProduct;
      this.loadProductInfo();
      return;
    }
    this.titleText = "Agregar";
    this.buttonText = "Guardar Producto";
    this.buttonAction = this.addProduct;
  }

  private addProduct(){
    if(this.name == ""){
      this.isErrorAlertOpen = true;
      this.errorDescription = "Debe Proporcionar un Nombre para el Producto";
      return;
    }
    const alias = this.alias.split(",");
    const newProduct = {
      name: this.name,
      alias1: this.utils.convertToEmptyString(alias[0]).trim(),
      alias2: this.utils.convertToEmptyString(alias[1]).trim(),
      alias3: this.utils.convertToEmptyString(alias[2]).trim(),
      brand: this.brand,
      image: this.image
    }
    this.productService.insertProduct(newProduct).subscribe(serverAnswer => {
      this.isToastOpen = true;
      if(this.quickCreation.isQuickCreation){
        setTimeout(() => {
          const quickNewProduct = newProduct as Product;
          quickNewProduct.id = serverAnswer.productId;
          this.quickCreation.quitQuickProductCreation(quickNewProduct);
        }, this.toastDuration);
        return;
      }
      this.clearFields();
    });
  }

  private editProduct(){
    const alias = this.alias.split(",");
    const productNewInfo = {
      id: this.productId,
      name: this.name,
      alias1: this.utils.convertToEmptyString(alias[0]),
      alias2: this.utils.convertToEmptyString(alias[1]),
      alias3: this.utils.convertToEmptyString(alias[2]),
      brand: this.brand,
      image: this.image
    }
    this.productService.updateProduct(productNewInfo).subscribe(() => {
      this.router.navigate(['product']);
    });
  }

  private loadProductInfo(){
    this.productService.getProduct(parseInt(this.productId as string)).subscribe(productInfo => {
      this.name = productInfo.name;
      this.alias = this.utils.placeAliasCommas([productInfo.alias1,productInfo.alias2,productInfo.alias3]);
      this.brand = productInfo.brand;
      this.image = productInfo.image;
    });
  }

  closeToast(){
    this.isToastOpen = false;
  }

  clearFields(){
    this.name = "";
    this.alias = "";
    this.brand= "";
    this.image = "";
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
}

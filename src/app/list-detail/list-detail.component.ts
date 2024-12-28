import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListProduct } from '../DTO/ListProduct';
import { ListModeObserverService } from '../services/list-mode-observer.service';
import { ListProductService } from '../services/list-product.service';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss'],
})
export class ListDetailComponent  implements OnInit {

  list: any = {};
  listProducts: ListProduct[] = [];
  existData: boolean = false;
  existMatches: boolean = true;

  isAlertOpen: boolean = false;
  alertButtons = [
    {
      text: "Aceptar",
      handler: () => {
        this.exitListMode();
      }
    },
    {
      text: "Cancelar",
      handler: () => {
        this.isAlertOpen = false;
      }
    }
  ];

  constructor(private listService: ListService,
    private listProductService: ListProductService,
    private router: Router,
    private route: ActivatedRoute,
    private listModeObserver: ListModeObserverService) {
    this.loadList();
  }
    
  ngOnInit(){
    
  }
  
  ionViewWillEnter(){
    this.loadList();
  }
    
  private loadList(){
    this.listService.getList(parseInt(this.route.snapshot.paramMap.get("id")!)).subscribe(serverAnswer => {
      this.list = serverAnswer;
      this.loadProducts();
    });
  }

  private loadProducts(){
    if(this.list.status == 'C'){
      this.listProductService.getListProducts(this.list.id).subscribe(serverAnswer => {
        this.existData = serverAnswer.length != 0;
        this.existMatches = true;
        this.listProducts = [];
        serverAnswer.forEach( (listProduct: any) => {
          this.listProducts.push(new ListProduct(listProduct.listId, listProduct.productId, listProduct.name,
            listProduct.alias1, listProduct.alias2, listProduct.alias3, listProduct.image, listProduct.quantity,
            listProduct.measurement, listProduct.measurementUnit, listProduct.productBrand, listProduct.listProductBrand,
            listProduct.estimatedCost, listProduct.status,listProduct.mealId));
        });
      });
      return;
    }

    this.listProductService.getPendantListProducts(this.list.id).subscribe(serverAnswer => {
      this.existData = serverAnswer.length != 0;
      this.existMatches = true;
      this.listProducts = [];
      if(!this.existData){
        this.exitListMode();
        return;
      }
      serverAnswer.forEach( (listProduct: any) => {
        this.listProducts.push(new ListProduct(listProduct.listId, listProduct.productId, listProduct.name,
          listProduct.alias1, listProduct.alias2, listProduct.alias3, listProduct.image, listProduct.quantity,
          listProduct.measurement, listProduct.measurementUnit, listProduct.productBrand, listProduct.listProductBrand,
          listProduct.estimatedCost, listProduct.status, listProduct.mealId));
      });
    });
  }

  search(event: any){
    const searchWord = event.target.value.trim().toLowerCase();
    if(searchWord != ''){
      this.listProductService.getMatchingProducts(this.list.id, searchWord).subscribe(serverAnswer => {
        this.existMatches = serverAnswer.length != 0;
        this.existData = true;
        this.listProducts = [];
        serverAnswer.forEach( (listProduct: any) => {
          this.listProducts.push(new ListProduct(listProduct.listId, listProduct.productId, listProduct.name,
            listProduct.alias1, listProduct.alias2, listProduct.alias3, listProduct.image, listProduct.quantity,
            listProduct.measurement, listProduct.measurementUnit, listProduct.productBrand, listProduct.listProductBrand,
            listProduct.estimatedCost, listProduct.status, listProduct.mealId));
        });
      });
      return;
    }
    this.loadProducts();
  }

  clearSearch(){
    this.loadProducts();
  }

  reloadProducts(){
    this.loadProducts();
  }

  exitListMode(){
    
    this.listService.updateListStatus({listId: this.list.id}).subscribe(() => {
      this.listProductService.updateListProductStatusMultiple({listId: this.list.id, status: 'N'}).subscribe(() => {
        this.listModeObserver.closeList();
        this.router.navigate(['list']);
      });
    });
  }

  refreshList(){
    this.loadList();
  }
}

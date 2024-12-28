import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ListProduct } from '../DTO/ListProduct';

@Injectable({
  providedIn: 'root'
})
export class ListProductService {

  private serviceUrl = `http://${environment.SERVICES_HOST_IP}/ShoppingList/services/shoppingListProduct.php`;

  constructor(private httpClient: HttpClient) { }

  public getListProducts(listId: number){
    return this.httpClient.get<any>(this.serviceUrl + "?action=all&listId=" + listId);
  }

  public getPendantListProducts(listId: number){
    return this.httpClient.get<any>(this.serviceUrl + "?action=pendant&listId=" + listId);
  }

  public getMatchingProducts(listId: number, matchingWord: string){
    return this.httpClient.get<any>(this.serviceUrl + `?action=match&listId=${listId}&matchingWord=${matchingWord}`);
  }

  public insertListProducts(products: ListProduct[]){
    return this.httpClient.post<any>(this.serviceUrl,products);
  }

  public updateListProduct(productNewInfo: ListProduct){
    return this.httpClient.put<any>(this.serviceUrl + "?action=one",productNewInfo);
  }

  public updateListProductStatus(productInfo: any){
    return this.httpClient.put<any>(this.serviceUrl + "?action=oneStatus",productInfo); 
  }

  public updateListProductStatusMultiple(productStatus: any){
    return this.httpClient.put<any>(this.serviceUrl + "?action=multipleStatus",productStatus);
  }

  public deleteListProduct(listId: number, productId: number, mealId: number){
    return this.httpClient.delete<any>(this.serviceUrl + `?listId=${listId}&productId=${productId}&mealId=${mealId}`);
  }
}

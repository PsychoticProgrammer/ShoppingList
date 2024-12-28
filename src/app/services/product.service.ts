import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  serviceUrl = `http://${environment.SERVICES_HOST_IP}/ShoppingList/services/product.php`;

  constructor(private http: HttpClient) { }

  public getProducts(){
    return this.http.get<any>(this.serviceUrl + "?action=all");
  }

  public getMatchingProducts(matchingWord: string){
    return this.http.get<any>(this.serviceUrl + "?action=match&matchingWord=" + matchingWord);
  }

  public getProduct(id: number){
    return this.http.get<any>(this.serviceUrl + "?action=one&id=" + id);
  }

  public insertProduct(product: {}){
    return this.http.post<any>(this.serviceUrl, product);
  }

  public updateProduct(productNewInfo: {}){
    return this.http.put<any>(this.serviceUrl,productNewInfo);
  }

  public deleteProduct(productId: any){
    return this.http.delete<any>(this.serviceUrl + "?id=" + productId);
  }
}

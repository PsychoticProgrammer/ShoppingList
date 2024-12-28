import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private serviceUrl = `http://${environment.SERVICES_HOST_IP}/ShoppingList/services/shoppingList.php`;

  constructor(private httpClient: HttpClient) { }

  public getAllShoppingLists(): Observable<any>{
    return this.httpClient.get<any>(this.serviceUrl + "?action=all");
  }

  public getMatchingShoppingLists(matchingWord: string){
    return this.httpClient.get<any>(this.serviceUrl + "?action=match&matchingWord=" + matchingWord);
  }

  public getList(id: number){
    return this.httpClient.get<any>(this.serviceUrl + "?action=one&id=" + id);
  }

  public insertList(newList: any){
    return this.httpClient.post<any>(this.serviceUrl,newList);
  }

  public updateList(newInfo: any){
    return this.httpClient.put<any>(this.serviceUrl,newInfo);
  }

  public deleteList(listId: number){
    return this.httpClient.delete<any>(this.serviceUrl + "?id=" + listId);
  }

  public updateListStatus(listId: any){
    return this.httpClient.patch<any>(this.serviceUrl,listId);
  }
}

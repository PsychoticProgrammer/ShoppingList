import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListModeObserverService {

  private createListEvent$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private closeListEvent$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(){

  }

  get createListEvent(){
    return this.createListEvent$.asObservable();
  }

  get closeListEvent(){
    return this.closeListEvent$.asObservable();
  }

  createList(){
    this.createListEvent$.next({});
  }

  closeList(){
    this.closeListEvent$.next({});
  }
}

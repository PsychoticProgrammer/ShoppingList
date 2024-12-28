import { Component } from '@angular/core';
import { ListModeObserverService } from './services/list-mode-observer.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  isTabVisible: boolean = true;

  constructor(private listModeObserver: ListModeObserverService){
    this.hideTab();
    this.showTab();
  }

  hideTab(){
    this.listModeObserver.createListEvent.subscribe(() => {
      this.isTabVisible = false;
    });
  }

  showTab(){
    this.listModeObserver.closeListEvent.subscribe(() => {
      this.isTabVisible = true;
    });
  }

}

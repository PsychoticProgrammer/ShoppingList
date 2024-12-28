import { Component, OnInit } from '@angular/core';
import { List } from '../DTO/List';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent  implements OnInit {

  lists: List[] = [];
  existData: boolean = false;
  existMatches: boolean = true;

  constructor(private listService: ListService) {
    this.loadLists();
  }
  
  ngOnInit() {

  }

  ionViewWillEnter(){
    this.loadLists();
  }
  
  private loadLists(){
    this.listService.getAllShoppingLists().subscribe(serverAnswer => {
      this.existData = serverAnswer.length != 0;
      this.existMatches = true;
      this.lists = serverAnswer;
    });
  }

  search(event: any){
    const searchWord = event.target.value.trim().toLowerCase();
    if(searchWord != ''){
      this.listService.getMatchingShoppingLists(searchWord).subscribe(serverAnswer => {
        this.existMatches = serverAnswer.length != 0;
        this.existData = true;
        this.lists = serverAnswer;
      });
      return;
    }
    this.loadLists();
  }

  clearSearch(){
    this.loadLists();
  }

  reloadLists(){
    this.loadLists();
  }
}

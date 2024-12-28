import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { List } from '../DTO/List';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent  implements OnInit {

  @Input() list: List;
  @Input() index: number;
  @ViewChild(IonModal) modal: IonModal;
  confirmModalButtons = ['Eliminar'];
  isModalOpen: boolean = false;
  isConfirmModalOpen: boolean = false;

  name: string = "";

  @Output() removedList = new EventEmitter<any>();

  constructor(private router: Router,
    private listService: ListService){
    
  }

  ngOnInit() {}

  goToListDetail(){
    this.router.navigate(["list/" + this.list.id]);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
    this.open_close_modal();
  }

  open_close_modal(){
    this.isModalOpen = !this.isModalOpen
    this.name = this.list.name;
  }

  open_close_confirm_modal(){
    this.isConfirmModalOpen = !this.isConfirmModalOpen;
  }

  editList(){
    this.list.name = this.name;
    this.listService.updateList({ id: this.list.id, name: this.name}).subscribe();
    this.open_close_modal();
  }

  removeList(){
    this.listService.deleteList(this.list.id).subscribe(() => {
      this.removedList.emit();
    });
  }
}

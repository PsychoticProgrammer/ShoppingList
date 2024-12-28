import { booleanAttribute, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.scss'],
})
export class ConfirmDeleteModalComponent  implements OnInit {

  @Input({ transform: booleanAttribute }) isOpen: boolean = false;
  @Input() subHeader = "";
  @Input() message = "";
  
  @Output() removedItem = new EventEmitter<any>();
  @Output() closedModal = new EventEmitter<any>();
  
  confirmModalButtons = [
    {
      text: "Eliminar",
      handler: () => {
        this.removedItem.emit();
      }
    },
    {
      text: "Cancelar",
      handler: () => {
        this.closeModal();
      }
    }
  ]

  constructor() { }

  ngOnInit() {}

  closeModal(){
    this.closedModal.emit();
    this.isOpen = false;
  }

}

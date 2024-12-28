import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
})
export class ImageViewerComponent  implements OnInit {

  @Input() product: string = "";
  @Input() image: string = "";
  @Input() isOpen: boolean = false;

  @Output() closedModal = new EventEmitter<any>();


  constructor() { }

  ngOnInit() {}

  close(){
    this.isOpen = false;
    this.closedModal.emit();
  }

}

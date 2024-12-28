import { booleanAttribute, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-data',
  templateUrl: './empty-data.component.html',
  styleUrls: ['./empty-data.component.scss'],
})
export class EmptyDataComponent  implements OnInit {

  @Input({transform: booleanAttribute}) existData: boolean = true;
  @Input({transform: booleanAttribute}) existMatches: boolean = true;

  constructor() { }

  ngOnInit() {}

  /*Invierte el valor, dado que si ambas son falsas, se muestran ambas, pero basta que se muestre una, en este
  caso, la de no se ha guardado nada*/
  hasMatches(){
    if(this.existData){
      if(!this.existData && !this.existMatches){
        this.existMatches = true;
      }
      return true;
    }
    return false;
  }

}

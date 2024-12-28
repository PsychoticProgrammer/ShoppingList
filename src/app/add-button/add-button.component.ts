import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss'],
})
export class AddButtonComponent  implements OnInit {

  @Input() route!: string;

  constructor(private router: Router) { }

  ngOnInit() {}

  public goToAddForm(){
    this.router.navigate([this.route]);
  }

}

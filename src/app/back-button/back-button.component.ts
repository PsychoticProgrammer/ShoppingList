import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent  implements OnInit {

  @Input() lastPage: string = "";

  constructor(private router: Router) { }

  ngOnInit() {}

  goToLastPage(){
    this.router.navigate([this.lastPage]);
  }

}

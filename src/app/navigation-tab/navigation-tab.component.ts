import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-tab',
  templateUrl: './navigation-tab.component.html',
  styleUrls: ['./navigation-tab.component.scss'],
})
export class NavigationTabComponent  implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit() {}

  goToLists(){
    this.router.navigate(["list"]);
  }

  goToProducts(){
    this.router.navigate(["product"]);
  }

  goToMeals(){
    this.router.navigate(["meal"]);
  }
}

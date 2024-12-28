import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then( m => m.ListModule)
  },
  {
    path: 'list/:id',
    loadChildren: () => import('./list-detail/list-detail.module').then( m => m.ListDetailModule)
  },
  {
    path: 'list-form',
    loadChildren: () => import('./list-form/list-form.module').then(m => m.ListFormModule)
  },
  {
    path: 'list-product-form/:id',
    loadChildren: () => import('./list-product-form/list-product-form.module').then(m => m.ListProductFormModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then( m => m.ProductModule)
  },
  {
    path: 'product-form',
    loadChildren: () => import('./product-form/product-form.module').then(m => m.ProductFormModule)
  },
  {
    path: 'product-form/:id',
    loadChildren: () => import('./product-form/product-form.module').then(m => m.ProductFormModule)
  },
  {
    path: 'meal',
    loadChildren: () => import('./meal/meal.module').then( m => m.MealModule)
  },
  {
    path: 'meal/:id',
    loadChildren: () => import('./meal-detail/meal-detail.module').then( m => m.MealDetailModule)
  },
  {
    path: 'meal-form',
    loadChildren: () => import('./meal-form/meal-form.module').then(m => m.MealFormModule)
  },
  {
    path: 'meal-ingredient-form/:id',
    loadChildren: () => import('./meal-ingredient-form/meal-ingredient-form.module').then(m => m.MealIngredientFormModule)
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

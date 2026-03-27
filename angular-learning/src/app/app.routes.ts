import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: 'counter', loadComponent: () => import('./pages/counter/counter').then(m => m.Counter) },
  { path: 'todo', loadComponent: () => import('./pages/todo/todo').then(m => m.Todo) },
  { path: 'signals', loadComponent: () => import('./pages/signals-demo/signals-demo').then(m => m.SignalsDemo) },
  { path: 'forms', loadComponent: () => import('./pages/reactive-forms/reactive-forms').then(m => m.ReactiveForms) },
  { path: 'lifecycle', loadComponent: () => import('./pages/lifecycle-hooks/lifecycle-hooks').then(m => m.LifecycleHooks) },
  { path: 'pipes', loadComponent: () => import('./pages/pipes-demo/pipes-demo').then(m => m.PipesDemo) },
  { path: '**', redirectTo: 'home' }
];

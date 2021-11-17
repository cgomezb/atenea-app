import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user'
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./features/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'learning',
    loadChildren: () =>
      import('./features/learning/learning.module').then(m => m.LearningModule)
  },
  {
    path: '**',
    redirectTo: 'user'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

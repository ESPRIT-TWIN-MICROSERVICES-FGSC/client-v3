import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthModule } from './modules/auth/auth.module';
import { ClientModule } from './modules/dashboard/client.module';
import {AuthGuard} from '@shared/_helpers/auth.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)},
  { path: 'dashboard', loadChildren: () => import('./modules/dashboard/client.module').then(m => m.ClientModule), canActivate: [AuthGuard]  },
  { path: '**', redirectTo: '/dashboard/hr' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }), AuthModule, ClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

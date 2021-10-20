import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthModule } from './modules/auth/auth.module';
import { ClientModule } from './modules/client/client.module';
import {AuthGuard} from '@shared/_helpers/auth.guard';
import {ErrorPageComponent} from '@shared/components/error-page/error-page.component';
import {DashboardNavigationComponent} from '@shared/components/navigation/dashboard-navigation.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)},
  { path: 'dashboard', loadChildren: () => import('./modules/client/client.module').then(m => m.ClientModule), canActivate: [AuthGuard]  },
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }), AuthModule, ClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthModule } from '@auth/auth.module';
import { ClientModule } from '@dashboard/client.module';
import {AuthGuard} from '@shared/_helpers/auth.guard';
import {EnqueteComponent} from '@satisfaction/enquete/enquete.component';
import {ThankYouComponent} from '@satisfaction/enquete/thank-you/thank-you.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)},
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/client.module').then(m => m.ClientModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'campaigns',
    loadChildren: () => import('./modules/satisfaction/campaigns.module').then(m => m.CampaignsModule),
  },
  {path: 'campaign/:u', component: EnqueteComponent},
  {path: 'thank-you', component: ThankYouComponent},
  { path: '**', redirectTo: '/dashboard/hr' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }), AuthModule, ClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

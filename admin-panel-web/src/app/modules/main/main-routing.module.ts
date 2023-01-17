/* Angular Stuff */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Our own stuff */
import { NotFoundComponent } from 'src/app/auth/components/not-found/not-found.component';
import { AuthenticationGuard } from 'src/app/auth/services/authentication.guard';
import { AccountInfoComponent } from './components/pages/account-info/account-info.component';
import { CategoryListComponent } from './components/pages/categories/category-list/category-list.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { HomeComponent } from './components/pages/home/home.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: ''
    , component: MainComponent
    , children:
      [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        {
          path: 'home',
          component: HomeComponent,
          // canActivate: [AuthenticationGuard]
        },
        {
          path: 'dashbaord',
          component: DashboardComponent,
          canActivate: [AuthenticationGuard]
        },
        {
          path: 'account',
          component: AccountInfoComponent,
          canActivate: [AuthenticationGuard]
        },
        {
          path: 'categories',
          component: CategoryListComponent,
        },
        {
          path: '**',
          component: NotFoundComponent
        }
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

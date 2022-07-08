import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { InDepthInformationComponent } from './in-depth-information/in-depth-information.component';
import { DataManagementComponent } from './data-management/data-management.component';
import { ProfileComponent } from './profile/profile.component';
import { PlatformSelectorComponent } from './monitoring/platform-selector/platform-selector.component';
import { MonitoringMenuComponent } from './monitoring/monitoring-menu/monitoring-menu.component';
import { PCMenuComponent } from './pComparison/pc-menu/pc-menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InDeepPlatformSelectorComponent } from './in-depth-information/in-deep-platform-selector/in-deep-platform-selector.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {}
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
    }
  },
  {
    path: 'monitoring',
    component: PlatformSelectorComponent,
    data: {
    }
  },
  {
    path: 'monitoring-menu',
    component: MonitoringMenuComponent,
    data: {
    }
  },
  {
    path: 'comparison',
    component: PCMenuComponent,
    data: {
    }
  },
  {
    path: 'in-depth',
    component: InDeepPlatformSelectorComponent,
    canActivate: [AuthGuard],
    data: {
    }
  },
  {
    path: 'in-depth_menu',
    component: InDepthInformationComponent,
    canActivate: [AuthGuard],
    data: {
    }
  },
  {
    path: 'data_management',
    component: DataManagementComponent,
    canActivate: [AuthGuard],
    data: {
    }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {
    }
  },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

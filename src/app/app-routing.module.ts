import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import('./pages/reset-password/reset-password.module').then(
        m => m.ResetPasswordPageModule
      )
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'form',
    loadChildren: () =>
      import('./form/form.module').then(m => m.FormPageModule)
  },
  {
    path: 'externals',
    loadChildren: () =>
      import('./externals/externals.module').then(m => m.ExternalsPageModule)
  },
  {
    path: 'images',
    loadChildren: () =>
      import('./images/images.module').then(m => m.ImagesPageModule)
  },
  {
    path: 'reportertest',
    loadChildren: () =>
      import('./reportertest/reportertest.module').then(m => m.ReportertestPageModule)
  },
  {
    path: 'table_and_lists',
    loadChildren: () =>
      import('./table-and-lists/table-and-lists.module').then(m => m.TableAndListsPageModule)
  },
  {
    path: 'reports/speed',
    loadChildren: () =>
      import('./reports/speed/speed.module').then(m => m.SpeedPageModule)
  },
  {
    path: 'reports/browser',
    loadChildren: () =>
      import('./reports/browser/browser.module').then(m => m.BrowserPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';

const routes: Routes = [
  {
    // main paths are usually defined as empty string
    // we use children array to show pages (routes) that refer to mainlayout
    path: '', component: MainLayoutComponent, children: [
      // to make angular load '' page we need to redirect it
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: HomePageComponent},
      // :id - means we will use dynamic id for this route
      {path: 'post/:id', component: PostPageComponent}
    ]
  },
  {
    // loadchildren for lazyloading
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // to preload admin module 
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

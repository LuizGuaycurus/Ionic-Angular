import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },

  // { path: 'perfil-usuario', loadChildren: './pages/perfil-usuario/perfil-usuario.module#PerfilUsuarioPageModule' },
  // { path: 'add-evento', loadChildren: './pages/add-evento/add-evento.module#AddEventoPageModule' },
  // { path: 'list-evento', loadChildren: './pages/list-evento/list-evento.module#ListEventoPageModule' },
  // { path: 'perfil-evento', loadChildren: './pages/perfil-evento/perfil-evento.module#PerfilEventoPageModule' },
  // { path: 'add-usuario', loadChildren: './pages/add-usuario/add-usuario.module#AddUsuarioPageModule' },
  // { path: 'list-usuario', loadChildren: './pages/list-usuario/list-usuario.module#ListUsuarioPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

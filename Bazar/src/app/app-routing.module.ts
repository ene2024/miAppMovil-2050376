import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { RegisterComponent } from './register/register.component';
import { CarritoComponent } from './carrito/carrito.component';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { MisProductosComponent } from './mis-productos/mis-productos.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HogarComponent } from './hogar/hogar.component';
import { JuguetesComponent } from './juguetes/juguetes.component';
import { ElectronicosComponent } from './electronicos/electronicos.component';
import { RopaComponent } from './ropa/ropa.component';
import { LibrosComponent } from './libros/libros.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', // Esta línea redirige a la página de inicio de sesión cuando la URL es /
    pathMatch: 'full'
  },
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CarritoComponent },
  { path: 'mis-productos', component: MisProductosComponent },
  {path : 'perfil', component: PerfilComponent },
  { path: 'electronicos', component: ElectronicosComponent },
  { path: 'ropa', component: RopaComponent }, 
  { path: 'hogar', component: HogarComponent },
  {path: 'libros', component: LibrosComponent }, 
  {path: 'juguetes', component: JuguetesComponent },

  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'producto-detalle/:id',
    loadChildren: () => import('./producto-detalle/producto-detalle.module').then(m => m.ProductoDetallePageModule)
  },
  {
    path: 'agregar-producto',
    component: AgregarProductoComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

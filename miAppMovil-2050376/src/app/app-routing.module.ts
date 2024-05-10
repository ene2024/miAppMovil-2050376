import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TareasComponent } from './tareas/tareas.component'; 
import { AgregarTareaComponent } from './agregar-tarea/agregar-tarea.component';
import { VistaTareaComponent } from './vista-tarea/vista-tarea.component';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'tareas',
    component: TareasComponent 
  },
  { path: 'agregar-tarea', component: AgregarTareaComponent },
  { path: 'vista-tarea/:id', component: VistaTareaComponent },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { MiComponenteComponent } from '../mi-componente/mi-componente.component'; 
import { TareasComponent } from '../tareas/tareas.component'; 
import { AgregarTareaComponent } from '../agregar-tarea/agregar-tarea.component'; 
import { VistaTareaComponent } from '../vista-tarea/vista-tarea.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, MiComponenteComponent, TareasComponent, AgregarTareaComponent, VistaTareaComponent ]
})
export class HomePageModule {}

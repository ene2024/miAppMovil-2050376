import { Component } from '@angular/core';
import { TareaService } from '../tarea.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-tarea',
  templateUrl: './agregar-tarea.component.html',
  styleUrls: ['./agregar-tarea.component.scss']
})
export class AgregarTareaComponent {
  nombreTarea: string = '';
  mesTarea: number = 1; 
  anioTarea: number = 2024; 
  descripcionTarea: string = '';

  constructor(private tareaService: TareaService, private router: Router) { }

  agregarTarea(nombre: string, mes: number, anio: number, descripcion: string) {
  
    const fechaFormateada = `${anio}-${mes.toString().padStart(2, '0')}`;

   
    const nuevaTarea = {
      id: Math.floor(Math.random() * 1000),
      nombre: this.nombreTarea,
      fecha: fechaFormateada, 
      descripcion: this.descripcionTarea
    };


    this.tareaService.agregarTarea(nuevaTarea);

    this.nombreTarea = '';
    this.mesTarea = 1; 
    this.anioTarea = 2024;
    this.descripcionTarea = '';

   
    this.router.navigateByUrl('/tareas');
  }
}

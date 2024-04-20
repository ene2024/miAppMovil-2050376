import { Component, OnInit } from '@angular/core';
import { TareaService } from '../tarea.service';
import { Tarea } from '../tarea.model';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss'],
})
export class TareasComponent implements OnInit {
  tareas: Tarea[] = [];

  constructor(private tareaService: TareaService) { }

  ngOnInit() {
    this.actualizarTareas();
  }

  private actualizarTareas(): void {
    this.tareas = this.tareaService.getTareas();
  }

  agregarTarea(nombre: string, fecha: Date): void {
    const nuevaTarea: Tarea = {
      id: this.tareas.length + 1,
      nombre: nombre,
      fecha: fecha,
      descripcion: "a"
    };
    this.tareaService.agregarTarea(nuevaTarea);
    this.actualizarTareas();
  }
}

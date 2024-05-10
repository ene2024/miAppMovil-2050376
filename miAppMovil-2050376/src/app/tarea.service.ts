import { Injectable } from '@angular/core';
import { Tarea } from './tarea.model';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private tareas: Tarea[] = [];

  constructor() { }

  getTareas(): Tarea[] {
    return this.tareas;
  }

  agregarTarea(nuevaTarea: Tarea): void {
    this.tareas.push(nuevaTarea);
  }
  getTareaById(id: number): Tarea | undefined {
    return this.tareas.find(tarea => tarea.id === id);
  }
}

import { Component, OnInit, ViewChild  } from '@angular/core';
import { TareaService } from '../tarea.service';
import { Tarea } from '../tarea.model';
import { IonAccordionGroup } from '@ionic/angular';

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
    mostrarDescripcion: false 
  }
  @ViewChild('accordionGroup', { static: true })
  accordionGroup!: IonAccordionGroup;


  private actualizarTareas(): void {
    this.tareas = this.tareaService.getTareas();
  }

  agregarTarea(nombre: string, fecha: string): void {
    const nuevaTarea: Tarea = {
      id: this.tareas.length + 1,
      nombre: nombre,
      fecha: fecha,
      descripcion: "a"
    };
    this.tareaService.agregarTarea(nuevaTarea);
    this.actualizarTareas();
  }
  toggleAccordion = () => {
    const nativeEl = this.accordionGroup;
    if (nativeEl.value === 'second') {
      nativeEl.value = undefined;
    } else {
      nativeEl.value = 'second';
    }
  };
  eliminarTarea(tarea: any) {
  
    const index = this.tareas.indexOf(tarea);
    if (index !== -1) {
    
      this.tareas.splice(index, 1);
    }
  }

}

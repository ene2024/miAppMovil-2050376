import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss'],
})
export class TareasComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}
  tareas=[
    {
      titulo: 'Llevar a Bruno al veterinario',
      fecha:'05/24'
    },
    {
      titulo: 'Recordar Tarea de Aplicaciones Moviles',
      fecha:'05/24'
    }
  ]

}

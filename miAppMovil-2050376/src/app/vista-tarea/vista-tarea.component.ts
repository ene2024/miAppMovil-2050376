import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tarea } from '../tarea.model';
import { TareaService } from '../tarea.service';


@Component({
  selector: 'app-vista-tarea',
  templateUrl: './vista-tarea.component.html',
  styleUrls: ['./vista-tarea.component.scss']
})
export class VistaTareaComponent implements OnInit {

  tarea: Tarea | undefined;

  constructor(private route: ActivatedRoute, private tareaService: TareaService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
this.tarea = this.tareaService.getTareaById(parseInt(id!!));

  }
}

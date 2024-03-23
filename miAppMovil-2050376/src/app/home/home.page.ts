import { Component } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {
    console.log("AppComponent: Constructor");
  }

  ngOnChanges(){
    console.log("AppComponente: OnChanges");
  }

  ngOnInit(){
    console.log("AppComponent: OnInit");
  }

  ngDoCheck(){
    console.log("AppComponent: DoCheck");
  }

  ngAfterContentInit(){
    console.log("AppComponent: AfterContentInit");
  }

  ngAfterContentChecked(){
    console.log("AppComponent: AfterContentChecked");
  }

  ngAfterViewInit(){
    console.log("AppComponent: AfterViewInit");
  }

  ngAfterViewChecked(){
    console.log("AppComponent: AfterViewChecked")
  }

  ngOnDestroy(){
    console.log("AppComponent : OnDestroy");
  }

  titulo: string = "Mi-App-Movil"

  hazmeClic() : void {
    alert("Hiciste clic!");
  }

  imgUrl: string = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.wikipedia.org%2Fwiki%2FClub_de_F%25C3%25BAtbol_Monterrey&psig=AOvVaw1fkuUgX5Jwc_z4jQsMGmuT&ust=1710981845700000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNjT2JvOgYUDFQAAAAAdAAAAABAE"


  nombreAlumno : string =' ';

  verdadero : boolean = true;
  tarjetas = [
    {
      nombre: "Arturo",
      numero: "8181818181818181",
      vigenciaInicio: "08",
      vigenciaFin: "27",
      CVV: "088"
    },
    {
      nombre: "Jared",
      numero: "8181818181818181",
      vigenciaInicio: "10",
      vigenciaFin: "27",
      CVV: "008"
    }
    
    
    ];

   
}

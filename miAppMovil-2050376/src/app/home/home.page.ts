import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  titulo: string = "Mi-App-Movil"

  hazmeClic() : void {
    alert("Hiciste clic!");
  }

  imgUrl: string = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.wikipedia.org%2Fwiki%2FClub_de_F%25C3%25BAtbol_Monterrey&psig=AOvVaw1fkuUgX5Jwc_z4jQsMGmuT&ust=1710981845700000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNjT2JvOgYUDFQAAAAAdAAAAABAE"

}

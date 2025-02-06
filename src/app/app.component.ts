import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetalleComponent } from './components/detalle/detalle.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, RouterLinkActive, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PokedexAngular';
  
  toggleMusica(){
    var musica:boolean = false
    musica = !musica;
    if (musica = true) {
      console.log("Está sonando la música");
      return true
    }
    else{
      console.log(musica);
      console.log("No está sonando la música");
      return false
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../interfaces/pokemon';
import { CommonModule, Location } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule,  RouterLinkActive, RouterLink],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent implements OnInit{

  pokemon?:Pokemon
  pokemonId?: string;
  url:string;
  description?:string;

  constructor(private pokemonService: PokemonService, private location: Location){
    this.url = this.location.path()
  }
  
  async ngOnInit(): Promise<void> {
    try {
      console.log(this.url);
      const arrayString:string[] = this.url.split("/");
      this.pokemonId = arrayString[2];

      this.pokemon = await this.pokemonService.getById(this.pokemonId);
      console.log(this.pokemon);

      this.description = await this.pokemonService.getDescription(this.pokemonId);
      console.log(this.description);
    } catch (error) {
      console.error('Error al obtener el Pokemon:', error);
    }
  }

  formatearId(idParam: number) {
    const idNumber = idParam.toString();
    if (idParam < 10) {
      return `000${idNumber}`;
    } else if (idParam < 100) {
      return `00${idNumber}`;
    } else if (idParam < 1000) {
      return `0${idNumber}`;
    } else {
      return idNumber;
    }
  }

  handleImageError(event: any) {
    event.target.src = '../../../assets/img/Default.png';
  }
}

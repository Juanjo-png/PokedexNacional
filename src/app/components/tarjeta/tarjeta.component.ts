import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Resultado } from '../../interfaces/pokeapi';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-tarjeta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta.component.html',
  styleUrl: './tarjeta.component.css'
})
export class TarjetaComponent implements OnChanges{

  constructor(private pokemonService: PokemonService){}

  ngOnChanges(changes: SimpleChanges): void {
    this.extraerInfo()
  }

  @Input() data?:Resultado;
  @Input() seleccionado:boolean = false;
  @Output() clickeado = new EventEmitter<string>();
  id:string = "0"
  
  extraerInfo(){
    if(this.data){
      this.id = this.data.url.substring(34,this.data.url.length-1);
      this.pokemonService.getById(this.id)
    }
  }

  formatearId(idParam: string) {
    const idNumber = parseInt(idParam);
    if (idNumber < 10) {
      return `000${idParam}`;
    } else if (idNumber < 100) {
      return `00${idParam}`;
    } else if (idNumber < 1000) {
      return `0${idParam}`;
    } else {
      return idParam;
    }
  }

  playSound(){
    let audio = new Audio;
    audio.src = "../../../assets/PokedexScroll.wav"
    audio.load()
    audio.play()
    audio.volume = 0.2
  }

  handleImageError(event: any) {
    event.target.src = '../../../assets/img/Default.png';
  }
}

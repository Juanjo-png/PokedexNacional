import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TarjetaComponent } from '../tarjeta/tarjeta.component';
import { PokemonService } from '../../services/pokemon.service';
import { Resultado } from '../../interfaces/pokeapi';
import { Pokemon } from '../../interfaces/pokemon';
import { FotoPokemonComponent } from '../foto-pokemon/foto-pokemon.component';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TarjetaComponent, FotoPokemonComponent, RouterLinkActive, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(private pokemonService: PokemonService){}
  @ViewChild("tarjetas") tarjetasElement!:ElementRef;

  listaPokemon:Resultado[] = []
  pagina: number = 1;
  cargando:boolean = false;
  pokemonSeleccionado?:Pokemon;


  ngOnInit(): void {
    this.cargarLista()
    this.pokemonService.getById("1")
  }

  async cargarLista(){
    if (this.cargando) return;
    this.listaPokemon = [...this.listaPokemon , ...await this.pokemonService.getByPage(this.pagina)];
    console.log(this.listaPokemon);
    this.pagina++
    this.cargando = false;
  }

  onScroll(e:any){
    if(
      Math.round(
      this.tarjetasElement.nativeElement.clientHeight + this.tarjetasElement.nativeElement.scrollTop
      )
      === e.srcElement.scrollHeight){
        this.cargarLista()
      }
  }

  async tarjetaClickeada(id:string){
    console.log(id);
    this.pokemonSeleccionado = await this.pokemonService.getById(id)
  }

}

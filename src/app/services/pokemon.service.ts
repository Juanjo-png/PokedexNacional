import { Injectable } from '@angular/core';
import { Resultado } from '../interfaces/pokeapi';
import { Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor() { }

  async getByPage(page:number ,size: number = 100):Promise<Resultado[]>{
    if (page > 5) return [];
    const offset = (page-1)*size
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${size}&offset=${offset}`)
    const resJSON = await res.json();
    if (resJSON.results.length > 0) return resJSON.results
    return [];
  }

  async getById(id:string):Promise<Pokemon>{
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return await res.json();

  }

  async getDescription(id: string | number):Promise<string>{
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
    const resJson = await res.json();
    const texto = resJson.flavor_text_entries.find((texto:any) =>  texto.language.name === "es")
    return texto ? texto.flavor_text : "No se encontró descripción en español";
  }
}

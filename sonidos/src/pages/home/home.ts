import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ANIMALES } from '../../data/data.animales';

import { Animal } from '../../interfaces/animal.interface';

import { Refresher, reorderArray }  from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales:Animal[] = [];
  audio = new Audio();
  audioTiempo:any;
  ordenando:boolean = false;

  constructor(public navCtrl: NavController) {
    this.animales = ANIMALES.slice(0);
  }

  reproducir(animal:Animal){

    this.pausar_audio(animal);

    if(animal.reproduciendo){
      animal.reproduciendo = false;
      return;
    }

    // Objeto Audio HTML 5
    this.audio.src = animal.audio;

    this.audio.load();
    this.audio.play();

    animal.reproduciendo = true;

    // Pongo un timeout para que ponga el reproduciendo en false cuando el audio termina
    this.audioTiempo = setTimeout(() => animal.reproduciendo = false, animal.duracion*1000)

  }

  private pausar_audio(animalSel:Animal){
    clearTimeout(this.audioTiempo);

    this.audio.pause();
    this.audio.currentTime = 0;

    for(let animal of this.animales){
      if(animal.nombre != animalSel.nombre){
        animal.reproduciendo = false;
      }
    }

  }

  borrar(i:number){
    this.animales.splice(i, 1);
  }

  doRefresh(refresher:Refresher){
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.animales = ANIMALES.slice(0);
      refresher.complete();
    }, 2000);
  }

  reordenar(indices:any){
    console.log(indices);
    this.animales = reorderArray(this.animales, indices);
  }

}

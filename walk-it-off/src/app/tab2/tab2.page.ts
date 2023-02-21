import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public storage:Storage) {}

  resetSettings(){
    localStorage.setItem("smart", "Off");
    localStorage.setItem("challenge", "Off");
    localStorage.setItem("manual", "Off");
  };

  place(key:string){
    return localStorage.getItem(key)
  }

  save(value : string, key :string){
    console.log(value);
    const selected = localStorage.setItem(key, value);
  }
}

import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  constructor(public storage:Storage) {
    
    
  }

  setData(){

  };

  resetSettings(){
    localStorage.setItem("gender", "Select Gender");
    localStorage.setItem("activity", "Activity Level");
    localStorage.setItem("nav", "Navigation App");
  };

  place(key:string){
    return localStorage.getItem(key)
  }

  save(value : string, key :string){
    console.log(value);
    const selected = localStorage.setItem(key, value);
  }
}

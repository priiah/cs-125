import {Component, OnInit} from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Tab4Page } from 'src/app/tab4/tab4.page';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page extends Tab4Page implements OnInit{

  constructor() {
    super(Tab4Page.constructor());
    localStorage.setItem("steps_walked", "0");
  }

  ngOnInit() {
    const printCurrentPosition = async () => {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log('Current position:', coordinates);
      return coordinates;
    };

    let latitude, longitude;
    printCurrentPosition().then((coords) => {
      latitude = coords.coords.latitude;
      longitude = coords.coords.longitude;

      localStorage.setItem("latitude", latitude.toString());
      localStorage.setItem("longitude", longitude.toString());
      //console.log(latitude);
    }).then(() => {
      //console.log(localStorage.getItem("latitude"));
      //console.log(localStorage.getItem("longitude"));
    });
  }

  display(key:string){
    if (key == "step"){
      if (localStorage.getItem(key) == "None"){
        if(localStorage.getItem("age") != "0"){
          var num = Number(localStorage.getItem("age"));
          if (num > 20){
            if (localStorage.getItem("activity") == "Active"){
              return "7000";
            }
            else if (localStorage.getItem("activity") == "Very Active"){
              if (num > 65){
                return "10500";
              }
              else{
                return "11500";
              }
            }
            return "3000";
          }
          else if (num > 12){
            if (localStorage.getItem("activity") == "Active"){
              return "10000";
            }
            else if (localStorage.getItem("activity") == "Very Active"){
              return "12500";
            }
            return "6000";
          }
          else if (num > 6){
            if (localStorage.getItem("activity") == "Active"){
              if (localStorage.getItem("gender") == "Female"){
                return "11000"
              }
              return "13000";
            }
            else if (localStorage.getItem("activity") == "Very Active"){
              if (localStorage.getItem("gender") == "Female"){
                return "13500"
              }
              return "15500";
            }
            return "6000";
          }
        }
    }
    return localStorage.getItem(key);
  }
    else if (key == "walk"){
      if (this.display("step_left") == "None"){
        return "0 Minutes";
      }
      var num = Number(this.display("step_left"))/100;
      localStorage.setItem("walk", num.toString());
      return localStorage.getItem("walk") + " Minutes";
    }
    else if (key == "step_left"){
      if (this.display("step") == "None"){
        return "None";
      }
      var num = Number(this.display("step")) - Number(localStorage.getItem("steps_walked"));
      if (num >= 0){
        return num.toString();
      }
      else {
        return 0;
      }

    }
    else {
      return localStorage.getItem(key);
    }

  }

}

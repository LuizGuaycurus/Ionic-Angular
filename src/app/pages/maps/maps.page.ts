import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {

  lat: number
  lng: number

  map: GoogleMap;

  constructor(
    private geolocation: Geolocation
  ) { }

  ngOnInit() {
    this.loadMap();
  }

  posLocal() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      console.log(this.lat, "  ", this.lng);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  posAtual() {
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  }

  async loadMap() {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };
    this.map = GoogleMaps.create('map_canvas', mapOptions);
  }

  //Google marker
  marker: Marker;
  mapClick() {
    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(
      res => {
        //console.log(res);
        if (this.marker) {
          this.marker.setPosition(res[0]);
        } else {
          this.addMarket();
        }
      })
  }

  addMarket() {
    this.marker = this.map.addMarkerSync({
      position: {
        lat: this.lat,
        lng: this.lng
      }
    });
  }
}

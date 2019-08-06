import { Component, OnInit, ViewChild,  ElementRef,  NgZone} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { firestore } from 'firebase/app';
declare var google: any;


interface Users {
  name: string;
}

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  texto : string = 'Mapa';
  latitude: number;
  longitude: number;
  zoom: number;
  Estatus: string;
  Id: string;
  Digital: String;
  Telefono: String;
  Cliente: String;
  address: string;
  private geoCoder;
  usuario: Users[];
  selectedUser: Users;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  usuarios: Observable<any[]>;
  constructor(public db: AngularFirestore, 
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
    this.usuarios = db.collection('Usuarios', ref => ref.where('Estatus', '==', 'Activo')).valueChanges();
    this.usuario = [
      {name: '169861'},
      {name: '215582'},
      {name: '554844'},
  ];
  }
  display: boolean = false;
  display2: boolean = false;
  display3: boolean = false;
  showDialog() {
      this.display = true;
  }
  showDialog2() {
    this.display2 = true;
}
clickedMarker() {
  this.display3 = true;
}
onSubmit(){
  this.db.collection("Tareas").doc(this.Id).set({
   Direccion: this.address,
   Estatus: this.Estatus,
   Punto: new firestore.GeoPoint(this.latitude, this.longitude),
   Digital: this.Digital,
   Telefono: this.Telefono,
   Cliente: this.Cliente,
   id: this.Id,
   });
   this.db.collection("Usuarios").doc(this.selectedUser.name).
   collection("Tareas").doc(this.Id).set({
   Fecha_Asignación: new Date().getTime(),
   id: this.selectedUser.name
   });
   this.display3 = false;
}
  ngOnInit() {
     //load Places Autocomplete
     this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
 
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          // @ts-ignore
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
 
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
 
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 13;
        });
      });
    });
  }
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 10;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }
  markerDragEnd($event: MouseEvent) {
    console.log($event);
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No se encontraron resultados');
        }
      } else {
        window.alert('Geocoder no funcionó debido a: ' + status);
      }
 
    });
  }
}
import { Component, OnInit, ViewChild,  ElementRef,  NgZone} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { firestore } from 'firebase/app';
declare var google: any;
interface ser {
    label: string;
    value: string;
  }
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {
  value: Date;
  date1: Date;
  date2: Date;
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
  mensaje: string;
  supervisor: string ='Supervisor';
  private geoCoder;
  Asignada: number;
  idT: string;
  docID: string;
  es: any;
  servicio: ser [];
  selectedServicio: ser;
  tareas: Observable<any[]>;
  tareasAsig: Observable<any[]>;
  tareasTer: Observable<any[]>;
  tareasEli: Observable<any[]>;
  check: Observable<any[]>;
  tarea: string;
  cliente: string;
  digital: string;
  direccion: string;
  estatus: string;
  checkNum: string;
  operador: string;
  select1: string;
  select2: string;
  select3: string;
  flota: Observable<any[]>;
  uid: string;
  
  @ViewChild('search')
  public searchElementRef: ElementRef;
  display2: boolean = false;
  showDialog2(idU: string) {
    this.display2 = true;
    this.messagesU = this.db.collection('Chats').doc('mensajes').
    collection(idU, ref => ref.orderBy('Hora')).valueChanges();
   this.idT = idU;
    console.log(this.idT);
}
  usuarios: Observable<any[]>;
  messages: Observable<any[]>;
  messagesU: Observable<any[]>;
  constructor(public db: AngularFirestore, 
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
      this.flota = db.collection('Flota', ref => ref.where('Estatus', '==', 'No_Asignado')).valueChanges();
    this.usuarios = db.collection('Usuarios', ref => ref.where('Estatus', '==', 'Activo')).valueChanges();
    this.messages = db.collection('Chats').doc('mensajesGrupal').
    collection('Grupal', ref => ref.orderBy('Hora')).valueChanges();
    this.tareas = db.collection('Tareas', ref => ref.where('Asignada', '==', 0)).valueChanges();
    this.tareasAsig = db.collection('Tareas', ref => ref.where('Asignada', '==', 1)).valueChanges();
    this.tareasTer = db.collection('Tareas', ref => ref.where('Estatus', '==', 'Terminada')).valueChanges();
    this.tareasEli = db.collection('Tareas', ref => ref.where('Estatus', '==', 'Borrada')).valueChanges();
    this.servicio = [
      {label: 'Rondin con cargo', value: 'Rondin con cargo'},
      {label: 'Rondin de cortesia', value: 'Rondin de cortesia'},
      {label: 'Base con cargo', value: 'Base con cargo'},
      {label: 'Base de cortesia', value: 'Base de cortesia'},
      {label: 'Permanencia con cargo', value: 'Permanencia con cargo'},
      {label: 'Permanencia de cortesia', value: 'Permanencia de cortesia'},
    ];
  }
  display: boolean = false;
  showDialog() {
      this.display = true;
  }
  displayAV: boolean = false;
  showDialogAV(ui) {
      this.displayAV = true;
      this.uid = ui;
  }
display3: boolean = false;  
clickedMarker() {
  this.display3 = true;
}
enviar(){
  this.db.collection("Chats").doc('mensajesGrupal').collection('Grupal').add({
    Hora: new Date(),
    message: this.mensaje,
    name: this.supervisor
    });
    this.mensaje = '';
}
enviarU(){
  this.db.collection("Chats").doc('mensajes').collection(this.idT).add({
    Hora:new Date(),
    message: this.mensaje,
    name: this.supervisor,
    Para: this.idT,
    });
    this.mensaje = '';
}
onSubmit(){
  if (this.select1 == undefined){
    this.Asignada = 0
  }else{
   this.Asignada = 1
  }
  this.db.collection("Tareas").add({
    }).then(ref => {
     this.docID = ref.id;
     ref.set({
    id: ref.id,
    Direccion: this.address,
    Estatus: 'Pendiente',
    Punto: new firestore.GeoPoint(this.latitude, this.longitude),
    Digital: this.Digital,
    Cliente: this.Cliente,
    Asignada: this.Asignada,
      });
      if(this.selectedServicio == undefined){
        this.db.collection("Tareas").doc(this.docID).update({
        Tipo: 'Checklist'
        });
      }else{
        this.db.collection("Tareas").doc(this.docID).update({
          Tipo: this.selectedServicio.value
          });
      }
      if(this.date1 == undefined){
       console.log('No fecha');
      }else{
        this.db.collection("Tareas").doc(this.docID).update({
         Fecha: this.date1,
          });
      }
      if(this.select1 == undefined){
        console.log('Sin asignar');
      }else{
      this.db.collection("Usuarios").doc(this.select1).
      collection("Tareas").doc(this.docID).set({
      Fecha_Asignación: new Date().getTime(),
      id: this.select1,
      });
      this.db.collection('Tareas').doc(this.docID).update({
       Operador: this.select1,
      });
      }
    });
    this.display3 = false;
   console.log(this.select1);
}
displayCheck: boolean = false;
  checklist(c){
    this.displayCheck = true;
    this.checkNum = c;
    console.log(this.checkNum);
    this.check = this.db.collection('Checklist', ref => ref.where('ID_Tarea', '==', this.checkNum)).valueChanges();
    this.display5 = false;
  }
  displayCheckA: boolean = false;
  checklistA(c){
    this.displayCheckA = true;
    this.checkNum = c;
    console.log(this.checkNum);
    this.check = this.db.collection('Checklist', ref => ref.where('ID_Tarea', '==', this.checkNum)).valueChanges();
    this.display6 = false;
  }
  asignar(){
    this.db.collection("Usuarios").doc(this.select2).
   collection("Tareas").doc(this.tarea).set({
   Fecha_Asignación: new Date().getTime(),
   id: this.select2,
   });
   this.db.collection('Tareas').doc(this.tarea).update({
    Asignada: 1,
    Operador: this.select2,
   });
   if(this.date2 == undefined){
    console.log('No fecha2');
   }else{
     this.db.collection("Tareas").doc(this.tarea).update({
      Fecha: this.date2,
       });
   }
   this.display4 = false;
  }
  eliminar(){
    this.db.collection('Tareas').doc(this.tarea).update({
      Asignada: 'N/A',
      Estatus: 'Borrada'
    })
    this.db.collection('Usuarios').doc(this.operador).collection('Tareas').doc(this.tarea).delete();
    this.display5 = false;
  }
  guardar(){
    this.db.collection('Tareas').doc(this.tarea).update({
      Digital: this.digital,
      Direccion: this.direccion,
      Cliente: this.cliente,
      Estatus: this.estatus,
      Asignada: 0,
  });
  }
  rechazar(){
   this.db.collection('Tareas').doc(this.tarea).update({
      Estatus: 'Rechazada',
   });
   this.displayCheckA = false;
  }
  aceptar(id:string){
    this.db.collection('Tareas').doc(this.tarea).update({
      Estatus: 'Terminada',
      Asignada: 'No aplica'
   });
   this.db.collection('Usuarios').doc(id).update({
    'Checklist': 0,
    'En_Ruta': 0,
   });
   this.displayCheckA = false;
  }
  display4: boolean = false;
  showDialog4(tId, c, dig, dir, es) {
      this.display4 = true;
      this.tarea = tId; 
     this.cliente = c; 
     this.digital = dig; 
     this.direccion= dir; 
     this.estatus = es; 
  }
  
  display5: boolean = false;
  showDialog5(tId, c, dig, dir, es, op) {
      this.display5 = true;
      this.tarea = tId; 
     this.cliente = c; 
     this.digital = dig; 
     this.direccion= dir; 
     this.estatus = es; 
     this.operador = op;
  }
     
  display6: boolean = false;
  showDialog6(tId, c, dig, dir, es, op) {
      this.display6 = true;
      this.tarea = tId; 
     this.cliente = c; 
     this.digital = dig; 
     this.direccion= dir; 
     this.estatus = es; 
     this.operador = op;
  }  
  asignarV(){
    console.log(this.uid);
    this.db.collection('Usuarios').doc(this.uid).update({
      'Asignado': 1,
      'Vehiculo': this.select3
    })
    this.db.collection('Flota').doc(this.select3).update({
      'Estatus': 'Asignado',
    });
    this.displayAV = false;
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
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","Ma","Mie","J","V","S" ],
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
      today: 'Hoy',
      clear: 'Borrar'
  }

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
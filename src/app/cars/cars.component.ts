import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  siniestro: string;
  numero: string;
  punto: string;
  comentario: string;
  hora: Date;
  fotografias: string;

  siniestros: Observable<any[]>
  flota: Observable<any[]>;

  constructor(public db: AngularFirestore) {
    this.flota = db.collection('Flota', ref => ref.where('Estatus', '==', 'No_Asignado')).valueChanges();
    this.siniestros = db.collection('Documentos-Vehiculos').doc('76AB2X').collection('Siniestros').valueChanges();
   }
   displayS: boolean = false;
   showDialogS(num, sin, pun, com, date, foto) {
       this.displayS = true;
       this.numero = num;
      this.siniestro = sin;
      this.punto = pun;
      this.comentario = com;
      this.hora = date;
      this.fotografias = foto;
   }
  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-siniestros',
  templateUrl: './siniestros.component.html',
  styleUrls: ['./siniestros.component.scss']
})
export class SiniestrosComponent implements OnInit {
  siniestros: Observable<any[]>
  siniestro: string;
  numero:string;
  punto: string;
  comentario:string;
  hora:Date;
  fotografias:string;
  constructor(public db: AngularFirestore) { 
    this.siniestros = db.collection('Documentos-Vehiculos').doc('76AB2X').collection('Siniestros').valueChanges();
  }
  display: boolean = false;
  showDialog(num, sin, pun, com, date, foto) {
      this.display = true;
      this.numero = num;
     this.siniestro = sin;
     this.punto = pun;
     this.comentario = com;
     this.hora = date;
     this.fotografias = foto;
      console.log(this.punto)
      console.log(this.comentario)
      console.log(this.hora)
      console.log(this.fotografias)
  }
  ngOnInit() {
  }

}

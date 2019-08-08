import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})
export class TareasComponent implements OnInit {
  tareas: Observable<any[]>;
  tareasAsig: Observable<any[]>;
  tareasTer: Observable<any[]>;
  tareasEli: Observable<any[]>;
  user: string;
  Id: string;
  constructor(public db: AngularFirestore) { 
    this.tareas = db.collection('Tareas', ref => ref.where('Asignada', '==', 0)).valueChanges();
    this.tareasAsig = db.collection('Tareas', ref => ref.where('Asignada', '==', 1)).valueChanges();
    this.tareasTer = db.collection('Tareas', ref => ref.where('Estatus', '==', 'Terminada')).valueChanges();
    this.tareasEli = db.collection('Tareas', ref => ref.where('Estatus', '==', 'Borrada')).valueChanges();
  }
  display: boolean = false;
  showDialog() {
      this.display = true;
  }
  display2: boolean = false;
  showDialog2() {
      this.display2 = true;
  }
  asignar(){
    this.db.collection("Usuarios").doc(this.user).
   collection("Tareas").doc(this.Id).set({
   Fecha_Asignación: new Date().getTime(),
   id: this.user,
   });
   this.db.collection('Tareas').doc(this.Id).update({
    Asignada: 1,
   });
   this.display = false;
  }
  eliminar(){
    this.db.collection('Tareas').doc(this.Id).update({
      Asignada: 'No aplica',
      Estatus: 'Borrada'
    })
    this.display2 = false;
  }

  ngOnInit() {
  }

}

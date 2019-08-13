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
  tarea: string;
  cliente: string;
  digital: string;
  direccion: string;
  estatus: string;
  telefono: string;

  constructor(public db: AngularFirestore) { 
    this.tareas = db.collection('Tareas', ref => ref.where('Asignada', '==', 0)).valueChanges();
    this.tareasAsig = db.collection('Tareas', ref => ref.where('Asignada', '==', 1)).valueChanges();
    this.tareasTer = db.collection('Tareas', ref => ref.where('Estatus', '==', 'Terminada')).valueChanges();
    this.tareasEli = db.collection('Tareas', ref => ref.where('Estatus', '==', 'Borrada')).valueChanges();
  }

  display: boolean = false;
  showDialog(tId, c, dig, dir, es, tel) {
      this.display = true;
      this.tarea = tId; 
     this.cliente = c; 
     this.digital = dig; 
     this.direccion= dir; 
     this.estatus = es; 
     this.telefono = tel; 
  }
  
  display2: boolean = false;
  showDialog2(tId, c, dig, dir, es, tel) {
      this.display2 = true;
      this.tarea = tId; 
     console.log(this.tarea);
     this.cliente = c; 
     console.log(this.cliente);
     this.digital = dig; 
     console.log(this.digital);
     this.direccion= dir; 
     console.log(this.direccion);
     this.estatus = es; 
     console.log(this.estatus);
     this.telefono= tel; 
     console.log(this.telefono);  
  }
  asignar(){
    this.db.collection("Usuarios").doc(this.user).
   collection("Tareas").doc(this.tarea).set({
   Fecha_Asignación: new Date().getTime(),
   id: this.user,
   });
   this.db.collection('Tareas').doc(this.tarea).update({
    Asignada: 1,
   });
   this.display = false;
  }
  eliminar(){
    this.db.collection('Tareas').doc(this.tarea).update({
      Asignada: 'No aplica',
      Estatus: 'Borrada'
    })
    this.display2 = false;
  }

  ngOnInit() {
  }

}

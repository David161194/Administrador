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
  check: Observable<any[]>;
  user: string;
  Id: string;
  tarea: string;
  cliente: string;
  digital: string;
  direccion: string;
  estatus: string;
  checkNum: string;
  operador: string;

  displayCheck: boolean = false;
  checklist(c){
    this.displayCheck = true;
    this.checkNum = c;
    console.log(this.checkNum);
    this.check = this.db.collection('Checklist', ref => ref.where('ID_Tarea', '==', this.checkNum)).valueChanges();
    this.display2 = false;
  }
  displayCheckA: boolean = false;
  checklistA(c){
    this.displayCheckA = true;
    this.checkNum = c;
    console.log(this.checkNum);
    this.check = this.db.collection('Checklist', ref => ref.where('ID_Tarea', '==', this.checkNum)).valueChanges();
    this.display3 = false;
  }
  constructor(public db: AngularFirestore) { 
    this.tareas = db.collection('Tareas', ref => ref.where('Asignada', '==', 0)).valueChanges();
    this.tareasAsig = db.collection('Tareas', ref => ref.where('Asignada', '==', 1)).valueChanges();
    this.tareasTer = db.collection('Tareas', ref => ref.where('Estatus', '==', 'Terminada')).valueChanges();
    this.tareasEli = db.collection('Tareas', ref => ref.where('Estatus', '==', 'Borrada')).valueChanges();
  }

  display: boolean = false;
  showDialog(tId, c, dig, dir, es) {
      this.display = true;
      this.tarea = tId; 
     this.cliente = c; 
     this.digital = dig; 
     this.direccion= dir; 
     this.estatus = es; 
  }
  
  display2: boolean = false;
  showDialog2(tId, c, dig, dir, es, op) {
      this.display2 = true;
      this.tarea = tId; 
     this.cliente = c; 
     this.digital = dig; 
     this.direccion= dir; 
     this.estatus = es; 
     this.operador = op;
  }
     
  display3: boolean = false;
  showDialog3(tId, c, dig, dir, es, op) {
      this.display3 = true;
      this.tarea = tId; 
     this.cliente = c; 
     this.digital = dig; 
     this.direccion= dir; 
     this.estatus = es; 
     this.operador = op;
  }   
  asignar(){
    this.db.collection("Usuarios").doc(this.user).
   collection("Tareas").doc(this.tarea).set({
   Fecha_Asignación: new Date().getTime(),
   id: this.user,
   });
   this.db.collection('Tareas').doc(this.tarea).update({
    Asignada: 1,
    Operador: this.user,
   });
   this.display = false;
  }
  eliminar(){
    this.db.collection('Tareas').doc(this.tarea).update({
      Asignada: 'N/A',
      Estatus: 'Borrada'
    })
    this.db.collection('Usuarios').doc(this.operador).collection('Tareas').doc(this.tarea).delete();
    this.display2 = false;
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
  aceptar(){
    this.db.collection('Tareas').doc(this.tarea).update({
      Estatus: 'Terminada',
      Asignada: 'No aplica'
   });
   this.displayCheckA = false;
  }

  ngOnInit() {
  }

}

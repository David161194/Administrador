import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  Nombre: string;
  Telefono: string;
  Id: string;
  usuarios: Observable<any[]>
  usuario: SelectItem[];
  user: string;
  usuarioLista: string;
  usuarioNombre: string;
  usuarioTelefono: string;
  constructor(public db: AngularFirestore) {
    this.usuarios = db.collection('Usuarios').valueChanges();
    this.usuario = [
      {label: 'Supervisor', value: 'Supervisor'},
      {label: 'Verificador', value: 'Verificador'},
  ];
   }

   display: boolean = false;
   showDialog() {
       this.display = true;
   }
   display2: boolean = false;
   showDialog2(u, n, t) {
       this.display2 = true;
       this.usuarioLista = u;
       this.usuarioNombre = n;
       this.usuarioTelefono = t;
       console.log(this.usuarioLista);
       console.log(this.usuarioNombre);
       console.log(this.usuarioTelefono);
   }
  crear(){
    this.db.collection('Usuarios').doc(this.Id).set({
        Estatus: 'Inactivo',
        Telefono: this.Telefono,
        Nombre: this.Nombre,
        id: this.Id,
        Tipo: this.user
    });
    this.display = false;
  }

  guardar(){
    if(this.Nombre == undefined){
      this.Nombre = this.usuarioNombre;
      console.log(this.Nombre);
  }
  if(this.Telefono == undefined){
    this.Telefono = this.usuarioTelefono;
    console.log(this.Telefono);
}
    this.db.collection('Usuarios').doc(this.usuarioLista).update({
      Telefono: this.Telefono,
      Nombre: this.Nombre,
      Tipo: this.user
  });
  }
  
  eliminar(){
    this.db.collection('Usuarios').doc(this.usuarioLista).delete();
    this.display2 = false;
  }

  ngOnInit() {
  }

}

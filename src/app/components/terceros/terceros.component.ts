import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tercero } from 'src/app/models/tercero';
import { TercerosService } from 'src/app/services/terceros.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-terceros',
  templateUrl: './terceros.component.html',
  styleUrls: ['./terceros.component.css']
})
export class TercerosComponent implements OnInit {

  terceros: Array<Tercero>;
  p = 1;

  constructor(private terceroService: TercerosService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.terceroService.getData().subscribe((res: any) => {
      console.log(res);
      this.terceros = res
    })
  }

  pageChanged(event) {
    this.p = event;
  }

  delete(id: number) {
    Swal.fire({
      title: 'Esta seguro?',
      text: "Se borrara este registro!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.terceroService.delete(id).subscribe((res: any) => {
          this.getData();
          Swal.fire(
            'Eliminado!',
            'El tercero fue eliminado con exito.',
            'success'
          )
        })

      }
    })
  }


}

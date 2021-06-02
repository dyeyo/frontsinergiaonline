import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tercero } from 'src/app/models/tercero';
import { TercerosService } from 'src/app/services/terceros.service';

@Component({
  selector: 'app-update-tercero',
  templateUrl: './update-tercero.component.html',
  styleUrls: ['./update-tercero.component.css']
})
export class UpdateTerceroComponent implements OnInit {

  ciudades: Array<any>;
  departamentos: Array<any>;
  contributor: Array<any>;
  formTerceros: FormGroup;
  idTercero: number;

  get tipo_identificacion() {
    return this.formTerceros.get("tipo_identificacion");
  }
  get numero_identificacion() {
    return this.formTerceros.get("numero_identificacion");
  }
  get nombre() {
    return this.formTerceros.get("nombre");
  }
  get apellido1() {
    return this.formTerceros.get("apellido1");
  }
  get departamento_id() {
    return this.formTerceros.get("departamento_id");
  }
  get municipio_id() {
    return this.formTerceros.get("municipio_id");
  }
  get tipo_contribuyente_id() {
    return this.formTerceros.get("tipo_contribuyente_id");
  }

  public errorMessages = {
    Tipo_identificacion: [{ type: 'required', message: 'Campo obligatorio' }],
    Numero_identificacion: [{ type: 'required', message: 'Campo obligatorio' }],
    Nombre: [{ type: 'required', message: 'Campo obligatorio' }],
    Apellido1: [{ type: 'required', message: 'Campo obligatorio' }],
    Departamento_id: [{ type: 'required', message: 'Campo obligatorio' }],
    Municipio_id: [{ type: 'required', message: 'Campo obligatorio' }],
    Tipo_contribuyente_id: [{ type: 'required', message: 'Campo obligatorio' }],
  };

  constructor(private terceroService: TercerosService, private fb: FormBuilder, private toastr: ToastrService,
    private router: Router, private routeActivate: ActivatedRoute) { }

  ngOnInit(): void {
    this.idTercero = +this.routeActivate.snapshot.params.id;

    this.formTerceros = this.fb.group({
      tipo_identificacion: ['', Validators.required],
      numero_identificacion: ['', Validators.required],
      nombre: ['', Validators.required,],
      nombre2: [''],
      apellido1: ['', Validators.required],
      apellido2: [''],
      departamento_id: ['', Validators.required],
      municipio_id: ['', Validators.required],
      tipo_contribuyente_id: ['', Validators.required],
    });
    this.getData();
    this.getCiudades();
    this.getDepartamentos();
    this.getContributor();
  }

  getData() {
    this.terceroService.edit(this.idTercero).subscribe((res: any) => {
      console.log(res.tercero);
      this.formTerceros = this.fb.group({
        tipo_identificacion: [res.tercero.tipo_identificacion, Validators.required],
        numero_identificacion: [res.tercero.numero_identificacion, Validators.required],
        nombre: [res.tercero.nombre, Validators.required,],
        nombre2: [res.tercero.nombre2],
        apellido1: [res.tercero.apellido1, Validators.required],
        apellido2: [res.tercero.apellido2],
        departamento_id: [res.tercero.departamento_id, Validators.required],
        municipio_id: [res.tercero.municipio_id, Validators.required],
        tipo_contribuyente_id: [res.tercero.tipo_contribuyente_id, Validators.required],
      });
    })
  }

  save() {
    const data = new Tercero();
    data.tipo_identificacion = this.formTerceros.value.tipo_identificacion;
    data.numero_identificacion = this.formTerceros.value.numero_identificacion;
    data.nombre = this.formTerceros.value.nombre;
    data.nombre2 = this.formTerceros.value.nombre2;
    data.apellido1 = this.formTerceros.value.apellido1;
    data.apellido2 = this.formTerceros.value.apellido2;
    data.departamento_id = this.formTerceros.value.departamento_id;
    data.municipio_id = this.formTerceros.value.municipio_id;
    data.tipo_contribuyente_id = this.formTerceros.value.tipo_contribuyente_id;
    console.log(data);

    this.terceroService.update(data, this.idTercero).subscribe(res => {
      this.toastr.success('Registro editado con exito', 'Genial!');
      this.router.navigateByUrl('/')
    })
  }

  getCiudades() {
    this.terceroService.getCiudades().subscribe((res: any) => {
      this.ciudades = res
    })
  }

  getDepartamentos() {
    this.terceroService.getDepartamentos().subscribe((res: any) => {
      this.departamentos = res
    })
  }

  getContributor() {
    this.terceroService.getContribuyente().subscribe((res: any) => {
      this.contributor = res
    })
  }
}

import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Tercero } from './../models/tercero';

@Injectable({
  providedIn: 'root'
})
export class TercerosService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(environment.URL_BASE);
  }

  getDepartamentos() {
    return this.http.get(`${environment.URL_BASE}/departamentos`);
  }

  getCiudades() {
    return this.http.get(`${environment.URL_BASE}/ciudades`);
  }

  getContribuyente() {
    return this.http.get(`${environment.URL_BASE}/contribuyentes`);
  }

  save(data: Tercero) {
    return this.http.post(`${environment.URL_BASE}/store`, data);
  }

  edit(id: number) {
    return this.http.get(`${environment.URL_BASE}/edit/${id}`);
  }

  update(data: Tercero, id: number) {
    return this.http.put(`${environment.URL_BASE}/update/${id}`, data);
  }

  delete(id: number) {
    return this.http.delete(`${environment.URL_BASE}/delete/${id}`);
  }




}

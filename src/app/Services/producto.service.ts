import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../Models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = 'https://localhost:7189/api/Producto/';
  constructor(private http: HttpClient) { }

  getProducto(): Observable<any>{
    // los observables son como promesas sirven para hacer peticiones as
   return  this.http.get(`${this.url}ConsultarProducto`);
  }

  deleteProducto(id: string): Observable<any>{
    return this.http.delete(`${this.url}EliminarProducto/${id}`);
  }
  guardarProducto(producto: Producto): Observable<any>{
    return this.http.post(`${this.url}crearProducto`, producto);
  }
  optenerProducto(id: string): Observable<any>{
    return this.http.get(`${this.url}ObtenerProducto/${id}`);
  }

  editarProducto(id: string, producto: Producto): Observable<any>{
    return this.http.put(`${this.url}ActualizarProducto/${id}`, producto);
  }
}

export class Producto{
  id?: number;
  nombre: string;
  categoria: string;
  ubicacion: string;
  precio: number;
  

  constructor(Nombre: string, Categoria: string, Ubicacion: string, precio: number){
    this.nombre = Nombre;
    this.categoria = Categoria;
    this.ubicacion = Ubicacion;
    this.precio = precio;
  }
}

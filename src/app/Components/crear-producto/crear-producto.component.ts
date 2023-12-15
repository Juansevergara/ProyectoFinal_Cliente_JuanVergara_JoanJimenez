import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/Models/Producto';
import { ProductoService } from 'src/app/Services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css'],
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  titulo = 'Crear Producto';
  id: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private productoService: ProductoService,
    private aRoute: ActivatedRoute
  ) {
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required],
    });
    // esto para acceder id
    this.id = this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.esEditar();
  }
  agregarProducto() {
    console.log(this.productoForm);
    const PRODUCTO: Producto = {
      
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    };

    if (this.id !== null) {
      //editamos producto
      this.productoService.editarProducto(this.id, PRODUCTO).subscribe(data=> {
        this.toastr.info(
          'El producto fue actualizado con exito!',
          'Producto actualizado!'
        );
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
        this.productoForm.reset();
        this.toastr.error(
          'El producto no fue actualizado con exito!',
          'Producto No Actualizado!'
        );
      });
    }
    else{
      //agregamos producto
      this.productoService.guardarProducto(PRODUCTO).subscribe(
        (data) => {
          this.toastr.success(
            'El producto fue registrado con exito!',
            'Producto Registrado!'
          );
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
          this.productoForm.reset();
          this.toastr.error(
            'El producto no fue registrado con exito!',
            'Producto No Registrado!'
          );
        }
      );
      // esto es para moverse a otra pagina
    }

  }

  esEditar() {
    if (this.id != null) {
      this.titulo = 'Editar Producto';
      this.productoService.optenerProducto(this.id).subscribe((data) => {
        this.productoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio,
        });
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Toast, ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/Models/Producto';
import { ProductoService } from 'src/app/Services/producto.service';

@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css']
})
export class ListarProductoComponent implements OnInit {
  listProductos: Producto[] =[];
  closeResult?: string;

  constructor(private _productoService: ProductoService,
    private toastr : ToastrService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(){
    this._productoService.getProducto().subscribe(data => {
      console.log(data);
      this.listProductos = data;
    },
    error => {
      console.log(error);
  })
  }

  eliminarProducto(id: any){
  this._productoService.deleteProducto(id).subscribe(data => {
    this.toastr.error('El producto fue eliminado con exito!', 'Producto Eliminado!');
    this.obtenerProductos();
  },
  error => {
    console.log(error);
  })
}

open(content: any) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}

}

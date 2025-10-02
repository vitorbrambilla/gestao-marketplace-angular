import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { take } from 'rxjs';
import { IProductResponse } from '../../interfaces/product-response';
import { ProductsService } from '../../services/products';

@Component({
  selector: 'app-products',
  imports: [ReactiveFormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  products: Array<IProductResponse> = [];
  filteredProducts: Array<IProductResponse> = [];

  filterForm = new FormGroup({
    title: new FormControl(''),
    status: new FormControl(''),
  });

  private readonly _productsService = inject(ProductsService);

  ngOnInit() {
    this._productsService
      .getProducts()
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.products = response.data;
          this.filteredProducts = response.data;
        },
      });
  }

  filterProducts() {
    const title = this.filterForm.value.title?.toLowerCase();
    const status = this.filterForm.value.status?.toLowerCase();

    this.filteredProducts = this.products.filter(
      (product) =>
        (!title || product.title.toLowerCase().includes(title)) &&
        (!status || product.status.toLowerCase() === status)
    );
  }

  clearFilter() {
    this.filterForm.reset();
    this.filterForm.get('status')?.setValue('');

    this.filteredProducts = this.products;
  }
}

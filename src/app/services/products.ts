import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { INewProductRequest } from '../interfaces/new-product-request';
import { INewProductResponse } from '../interfaces/new-product-response';
import { IProductsResponse } from '../interfaces/products-response';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly _httpClient = inject(HttpClient);

  saveProduct(product: INewProductRequest): Observable<INewProductResponse> {
    return this._httpClient.post<INewProductResponse>(`${environment.apiUrl}/products`, product);
  }

  getProducts(): Observable<IProductsResponse> {
    return this._httpClient.get<IProductsResponse>(`${environment.apiUrl}/products`);
  }
}

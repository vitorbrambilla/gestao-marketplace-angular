import { IProductResponse } from './product-response';

export interface IProductsResponse {
  message: string;
  data: Array<IProductResponse>;
}

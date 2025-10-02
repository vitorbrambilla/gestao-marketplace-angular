import { IProductResponse } from './product-response';

export interface INewProductResponse {
  message: string;
  data: Array<IProductResponse>;
}

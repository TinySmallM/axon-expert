import { ProductDeleteParams } from "./methods/product/ProductDeleteParams"
import { ProductDeleteResponse } from "./methods/product/ProductDeleteResponse"
import { ProductGetParams } from "./methods/product/ProductGetParams"
import { ProductGetResponse } from "./methods/product/ProductGetResponse"
import { ProductCreateParams } from "./methods/product/ProductPostParams"
import { ProductCreateResponse } from "./methods/product/ProductPostResponse"

// 'GET' | 'POST' | 'PATCH' | 'DELETE'

// export type Paths = {
//   '/productTypesG': {
//     method: 'GET'
//     params: ProductGetParams
//     response: ProductGetResponse[]
//   }

//   '/productTypesP': {
//     method: 'POST'
//     params: ProductCreateParams
//     response: ProductCreateResponse
//   }
  
//   '/productTypesD': {
//     method: 'DELETE',
//     params: ProductDeleteParams,
//     response: ProductDeleteResponse
//   }
// }

export type Methods = {
  '/productTypes': {
    'GET': {
      params: ProductGetParams;
      response: ProductGetResponse[];
    };
    'POST': {
      params: ProductCreateParams;
      response: ProductCreateResponse;
    };
  };

  [key: `/productTypes/${string}`]: {
    'DELETE': {
      params: ProductDeleteParams;
      response: ProductDeleteResponse;
    };
  };
};
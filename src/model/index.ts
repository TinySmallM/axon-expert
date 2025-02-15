import { ProductDeleteParams } from "./methods/product/ProductDeleteParams"
import { ProductDeleteResponse } from "./methods/product/ProductDeleteResponse"
import { ProductGetParams } from "./methods/product/ProductGetParams"
import { ProductGetResponse } from "./methods/product/ProductGetResponse"
import { ProductCreateParams } from "./methods/product/ProductCreateParams"
import { ProductCreateResponse } from "./methods/product/ProductCreateResponse"
import { ProductUpdateParams } from "./methods/product/ProductUpdateParams"
import { ProductUpdateResponse } from "./methods/product/ProductUpdateResponse"

// 'GET' | 'POST' | 'PATCH' | 'DELETE'
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
    'GET': {
      params: ProductGetParams;
      response: ProductGetResponse;
    }

    'DELETE': {
      params: ProductDeleteParams;
      response: ProductDeleteResponse;
    };

    'PATCH': {
      params: ProductUpdateParams;
      response: ProductUpdateResponse;
    };
  };
};

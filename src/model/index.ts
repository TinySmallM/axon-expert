import { ProductGetParams } from "./methods/product/ProductGetParams"
import { ProductGetResponse } from "./methods/product/ProductGetResponse"

// 'GET' | 'POST' | 'PATCH' | 'DELETE'

export type Paths = {
  '/productTypes': {
    method: 'GET'
    params: ProductGetParams
    response: ProductGetResponse[]
  }
}
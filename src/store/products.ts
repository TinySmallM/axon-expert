import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { FetchError } from "../root/FetchError"
import { ProductCreateParams } from "../model/methods/product/ProductCreateParams"
import * as Product  from "../model/Product"
import { Payload } from "../model/methods/product/ProductUpdateParams"
import { getApi } from "../utils/utils"

type slice = {
  productStatus: Product.ProductStatus
  productTypes: Product.Products[]
  productElement?: Product.Product
  errorMessage?: string
}

const initialState: slice = {
  productStatus: null,
  productTypes: [],
}

const api = getApi()

export const products = createSlice({
  name: 'products',
  initialState: initialState satisfies slice,
  reducers: {
    resetStatus: (state) => {
      state.productStatus = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.productStatus = 'loading'
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.productStatus = 'done'

      if (action.payload) {
        state.productTypes = action.payload.reverse() //Sort by date
      }
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.productStatus = 'error'
      state.errorMessage = action.payload as string
    });

    builder.addCase(fetchProductById.pending, (state) => {
      state.productStatus = 'loading'
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.productStatus = 'done'

      if (action.payload) {
        state.productElement = action.payload
      }
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.productStatus = 'error'
      state.errorMessage = action.payload as string
    });

    builder.addCase(createProduct.pending, (state) => {
      state.productStatus = 'loading'
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.productStatus = 'done'
      
      if (action.payload) {
        state.productTypes.push(action.payload)
      }
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.productStatus = 'error'
      state.errorMessage = action.payload as string
    });

    builder.addCase(removeProduct.pending, (state) => {
      state.productStatus = 'loading'
    });
    builder.addCase(removeProduct.fulfilled, (state, action) => {
      state.productStatus = 'done'

      if (action.payload) {
        state.productTypes = state.productTypes.filter((item) => item.id !== action.payload)
      }
    });
    builder.addCase(removeProduct.rejected, (state, action) => {
      state.productStatus = 'error'
      state.errorMessage = action.payload as string
    });

    builder.addCase(updateProduct.pending, (state) => {
      state.productStatus = 'loading'
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.productStatus = 'done'

      if (action.payload) {
        state.productElement = action.payload
      }
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.productStatus = 'error'
      state.errorMessage = action.payload as string
    });
  }
})

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, {rejectWithValue}) => {

    try {
     return await api.doFetch('/productTypes', 'GET')
    }
    catch (error) {
      if (error instanceof FetchError) {
        console.log(error)
        return rejectWithValue(error.text)
      }
    }
  },
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId: string, { rejectWithValue }) => {
    try {
     return await api.doFetch(`/productTypes/${productId}`, 'GET')
    }
    catch (error) {
      if (error instanceof FetchError) {
        console.log(error)
        return rejectWithValue(error.text)
      }
    }
  },
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (params: ProductCreateParams, { rejectWithValue }) => {
    try {
     return await api.doFetch('/productTypes', 'POST', params)
    }
    catch (error) {
      if (error instanceof FetchError) {
        console.log(error)
        return rejectWithValue(error.text)
      }
    }
  },
);

export const removeProduct = createAsyncThunk(
  "products/removeProduct",
  async (productId: string, { rejectWithValue }) => {
    try {
     await api.doFetch(`/productTypes/${productId}`, 'DELETE')
     return productId
    }
    catch (error) {
      if (error instanceof FetchError) {
        console.log(error)
        return rejectWithValue(error.text)
      }
    }
  },
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (payload: Payload, { rejectWithValue }) => {
    
    try {
     return await api.doFetch(`/productTypes/${payload.id}`, 'PATCH', payload.params)
    }
    catch (error) {
      if (error instanceof FetchError) {
        console.log(error)
        return rejectWithValue(error.text)
      }
    }
  },
);
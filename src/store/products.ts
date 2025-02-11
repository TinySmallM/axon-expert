import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { useRoot } from "../hooks/useRoot"
import { FetchError } from "../root/FetchError"
import { ProductCreateParams } from "../model/methods/product/ProductPostParams"
import * as Product  from "../model/Product"

const { api } = useRoot()

type slice = {
  productState: Product.statusProduct
  productTypes: Product.Products[]
  errorMessage?: string
}

const initialState: slice = {
  productState: 'loading',
  productTypes: [],
}

export const products = createSlice({
  name: 'productsData',
  initialState: initialState satisfies slice,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.productState = 'loading'
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.productState = 'done'

      if (action.payload) {
        state.productTypes = action.payload
      }
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.productState = 'error'
      state.errorMessage = action.payload as string
    });

    builder.addCase(createProduct.pending, (state) => {
      state.productState = 'loading'
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.productState = 'done'
      
      if (action.payload) {
        state.productTypes.push(action.payload)
      }
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.productState = 'error'
      state.errorMessage = action.payload as string
    });

    builder.addCase(removeProduct.pending, (state) => {
      state.productState = 'loading'
    });
    builder.addCase(removeProduct.fulfilled, (state, action) => {
      state.productState = 'done'

      state.productTypes = state.productTypes.filter((item) => item.id !== action.payload)
    });
    builder.addCase(removeProduct.rejected, (state, action) => {
      state.productState = 'error'
      state.errorMessage = action.payload as string
    });
  }
})

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
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
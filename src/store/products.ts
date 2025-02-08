import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ProductGetResponse } from "../model/methods/product/ProductGetResponse"
import { useRoot } from "../hooks/useRoot"
import { FetchError } from "../root/FetchError"

const { api } = useRoot()

type slice = {
  productState: 'loading' | 'done' | 'error'
  productTypes: ProductGetResponse[]
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
  }
})

export const fetchProducts = createAsyncThunk(
  "products/productsData",
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
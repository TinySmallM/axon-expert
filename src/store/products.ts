import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit"
import { ProductGetResponse } from "../model/methods/product/ProductGetResponse"
import { useRoot } from "../hooks/useRoot"

const { api } = useRoot()

type slice = {
  productState: 'loading' | 'done' | 'error'
  productTypes: ProductGetResponse[]
  message?: SerializedError
}

const initialState: slice = {
  productState: 'loading',
  productTypes: []
}

export const products = createSlice({
  name: 'productsData',
  initialState: initialState satisfies slice,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.productState = 'loading'
    });
    builder.addCase(fetchProducts.fulfilled, (state) => {
      state.productState = 'done'
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.productState = 'error'
      state.message = action.error
    });
  }
})

export const fetchProducts = createAsyncThunk(
  "products/productsData",
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.doFetch('/productTypes', 'GET')
      return result
    }
    catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  },
);
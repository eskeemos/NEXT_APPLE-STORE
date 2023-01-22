import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store';

interface BasketState {
  items: Product[]
}

const initialState: BasketState = {
  items: []
}

export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

  }
})

export const { } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer
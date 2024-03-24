import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    keywords: undefined,
  }
  
export const keywordsSlice = createSlice({
    name: 'dreamKeyWords',
    initialState,
    reducers:{
        dreamKeyWords:(state, action) =>{
            state.keywords = action.payload;
        }
    }
})

export const { dreamKeyWords } = keywordsSlice.actions

export default keywordsSlice.reducer
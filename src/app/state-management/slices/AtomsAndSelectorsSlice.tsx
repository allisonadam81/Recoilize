import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../index';

interface selectedState {
  atomsAndSelectors: {
    atoms: string[];
    selectors: string[];
    $selectors: any;
  };
}

const initialState: selectedState = {
  atomsAndSelectors: {
    atoms: [],
    selectors: [],
    $selectors: {},
  },
};

// zoom: zoomReducer,
// throttle: throttleReducer,
// snapshot: snapshotReducer,
// atomNetwork: atomNetworkReducer,
// filter: filterReducer,
// selected: selectedReducer,

export const atomsAndSelectorsSlice = createSlice({
  name: 'atomsAndSelectors',
  initialState,
  reducers: {
    setAtomsAndSelectors: (state, action: PayloadAction<any>) => {
      state.atomsAndSelectors = action.payload;
    },
  },
});

// console.log('atomsAndSelectorsSlice:', atomsAndSelectorsSlice);

export const {setAtomsAndSelectors} = atomsAndSelectorsSlice.actions;

// eslint-disable-next-line prettier/prettier
export const selectAtomsAndSelectorsState = (state: RootState) => state.atomsAndSelectors;

export default atomsAndSelectorsSlice.reducer;

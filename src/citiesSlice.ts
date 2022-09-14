import { CityModel } from "./models/cityModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./app/store";

export interface selectionState {
    disabled: CityModel[],
    enabled: CityModel[]
}

const initialState: selectionState = {
    disabled: [],
    enabled: []
}
const compareCities = (c1: any, c2: any) => c1.name.localeCompare(c2.name);

// Generic function to move one city from an array to another given its id
function moveCity(from: CityModel[], to: CityModel[], id: number): boolean {
    let index = from.findIndex((curr) => curr._id === id);
    if (index < 0) return false;
    else {
        to.unshift(from[index]);
        from.splice(index, 1);
        return true;
    }
}
export const citiesSlice = createSlice({
    name: 'selections',
    initialState,
    reducers: {
        enableCity: (state, action: PayloadAction<number>) => {
            const moveRes = moveCity(state.disabled, state.enabled, Number(action.payload));
            if (!moveRes) {
                alert('Error');
                console.log('Enabled city not found');
                console.log('id: ', action.payload);
                return;
            }
        },
        disableCity: (state, action: PayloadAction<number>) => {
            const moveRes = moveCity(state.enabled, state.disabled, Number(action.payload));
            if (!moveRes) {
                alert('Error');
                console.log('Enabled city not found');
                console.log('id: ', action.payload);
                return;
            } else {
                state.disabled.sort(compareCities);
            }
        },
        reset: (state) => {
            state.enabled = [];
            state.disabled = [];
        },
        loadCities: (state, action: PayloadAction<CityModel[]>) => {
            state.disabled = [...action.payload].sort(compareCities);                           // Sort to have selector items in alphabetical order
        }
    }
});

export const { enableCity, disableCity, reset, loadCities } = citiesSlice.actions;

export const enabledCities = (state: RootState) => state.persistedReducer.enabled;              // State accessors
export const disabledCities = (state: RootState) => state.persistedReducer.disabled;

export default citiesSlice.reducer;

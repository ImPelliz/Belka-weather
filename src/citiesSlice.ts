import {CityModel} from "./models/cityModel";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "./app/store";

export interface selectionState {
    disabled: CityModel[],
    enabled: CityModel[]
}

const initialState: selectionState = {
    disabled: [],
    enabled: []
}
const compareCities = (c1: any, c2: any) => c1.name.localeCompare(c2.name);

function moveCity(from: CityModel[], to: CityModel[], id: number): [CityModel[], CityModel[]] | [undefined, undefined]{
    let index = from.findIndex((curr) => curr._id === id);
    if(index < 0) return [undefined, undefined];
    else{
        to.unshift(from[index]);
        from.splice(index,1);
        return [from, to];
    }
}
export const citiesSlice = createSlice({
    name: 'selections',
    initialState,
    reducers: {
        enableCity: (state, action: PayloadAction<number>) => {
            const cityArrays = moveCity(state.disabled, state.enabled, Number(action.payload));
            if(cityArrays[0] === undefined){
                alert('Error');
                console.log('Enabled city not found');
                console.log('id: ' , action.payload);
                return;
            }else{
                [state.disabled, state.enabled] = cityArrays;
            }
        },
        disableCity: (state, action: PayloadAction<number>) => {
            const [enabled, disabled] = moveCity(state.enabled, state.disabled, Number(action.payload));
            if(enabled === undefined){
                alert('Error');
                console.log('Enabled city not found');
                console.log('id: ' , action.payload);
                return;
            }else{
                console.log(disabled);
                [state.enabled, state.disabled] = [enabled, disabled?.sort(compareCities)];
            }
        },
        reset: (state) => {
            state.enabled = [];
            state.disabled = [];
        },
        loadCities: (state, action: PayloadAction<CityModel[]>) => {
            state.disabled = [...action.payload].sort(compareCities);
        }
    }
});

export const { enableCity, disableCity, reset, loadCities } = citiesSlice.actions;

export const enabledCities = (state: RootState) => state.persistedReducer.enabled;
export const disabledCities = (state: RootState) => state.persistedReducer.disabled;

export default citiesSlice.reducer;

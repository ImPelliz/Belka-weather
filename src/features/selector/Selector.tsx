import './Selector.css'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {disabledCities, enableCity} from '../../citiesSlice';

export default function Selector() {
    const dispatch = useAppDispatch();
    const cities = useAppSelector(disabledCities);
    const list = cities.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)
    function handleSelection(e: any){
        dispatch(enableCity(e.target.value));
        e.target.value = "";
    }

    return (
        <select id='cityInput' defaultValue='' onChange={handleSelection} >
            <option value='' disabled>Select a city to add</option>
            <option value='res'>Reset</option>
            {list}
        </select>
    );
}

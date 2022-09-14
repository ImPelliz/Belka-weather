import React from "react";
import CityView from "../cityView/CityView";
import './CityList.css'
import {useAppSelector} from "../../app/hooks";
import {enabledCities} from "../../citiesSlice";

export default function CityList() {
    const cities = useAppSelector(enabledCities);

    
    return (
        <div id='listView'>
            {cities.map(c => <CityView city={c} key={c._id}/>)}
        </div>
    )
}

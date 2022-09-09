import React, {useEffect, useState} from "react";
import './CityView.css';
import {CityModel} from "../../models/cityModel";
import {getForecast} from "../../app/weatherService";
import {ApiErrorModel, ApiResponseModel} from "../../models/ResponseModel";
import {OW_ICON} from "../../data/config";
import {IoReload, IoRemove} from 'react-icons/io5'
import {useAppDispatch} from "../../app/hooks";
import {disableCity} from "../../citiesSlice";
import {IoAlert} from "react-icons/io5";


type propsModel = {
    city: CityModel
}

export default function CityView({ city } : propsModel ) {
    const dispatch = useAppDispatch();
    const [description, setDescription] = useState('loading...');
    const [icon, setIcon] = useState('');
    const [loading, setLoading] = useState(false);
    const [requestError, setError] = useState(false);
    let currentForecast: ApiResponseModel;
    let loaded = false;
    function loadWeather (){
        if(loading) return;
        setLoading(true);
        loaded = true;
        getForecast(city).then((res) => {
            if(res.ok){
                res.json().then((response: ApiResponseModel) => {
                    setDescription(response.weather[0].description);
                    setIcon(OW_ICON + '/' + response.weather[0].icon + '.png');
                    currentForecast = response;
                    setError(false);
                })
            }else{
                setError(true);
                setDescription("Request error " + res.status);
                res.json().then((res : ApiErrorModel) => console.log(res.message))
            }
            setLoading(false);
        }).catch((err) => {
            setError(true);
            setDescription("Connection error");
            console.log(err);
        })
    }
    function disable(){
        dispatch(disableCity(city._id));
    }
    useEffect(() => {
        if(currentForecast === undefined && !loaded) loadWeather();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div id='container' className={requestError?"error":""}>
            <div id='name'>
                {city.name}
            </div>
            <div id='forecast'>
                {!requestError? <img alt='' src={icon}/> : <IoAlert size="1.5rem" color="red"/>}
                <span className="description">{description}</span>
            </div>
            <div id='buttons'>
                <button id='refreshBtn' onClick={loadWeather} disabled={loading}><IoReload size="1.5rem"/></button>
                <button id='removeBtn' onClick={disable} disabled={loading}><IoRemove size="1.5rem" color="red"/></button>
            </div>
        </div>
    )
}

import './App.css';
import Selector from "./features/selector/Selector";
import CityList from "./features/cityList/CityList";
import {useAppDispatch} from "./app/hooks";
import {useEffect, useState} from "react";
import {loadCities} from "./citiesSlice";
import cities from './data/cities.json'

function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
            dispatch(loadCities(cities));
    }, []);

  return (
    <div className="App">
      <header>
          <h1>Weather info</h1>
      </header>
      <main>
          <Selector />
          <CityList />
      </main>
    </div>
  );
}

export default App;

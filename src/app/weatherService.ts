import {OW_BASEURL, OW_APIKEY} from "../data/config";
import {CityModel} from "../models/cityModel";

export async function getForecast (city: CityModel): Promise<Response> {
    let params = '?lat=' + city.coord.lat + '&lon=' + city.coord.lon + '&appid=' + OW_APIKEY;
    console.log('CALLING \n' + OW_BASEURL + params);
    return fetch(OW_BASEURL + params);
}

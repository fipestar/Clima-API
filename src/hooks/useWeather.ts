import axios from "axios";
import type { SearchType } from "../types";

export default function useWeather() {
    const fetchWeather = async (search: SearchType) => {
        const appid = "0f283923b5a734ca68ca96ed99217a45"
        
        try {
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appid}`
            
            const {data} = await axios(geoUrl);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
        
    }

    return {
        fetchWeather
    }
}
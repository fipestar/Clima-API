import axios from "axios";
import { z } from "zod";
import { type SearchType } from "../types";
import { useMemo, useState } from "react";

//Zod

 const Weather = z.object({
     name: z.string(),
     main: z.object({
         temp: z.number(),
         temp_max: z.number(),
         temp_min: z.number()
     })
 })

 export type Weather = z.infer<typeof Weather>

const intialState = {
    name: '',
        main: {
            temp: 0,
            temp_max: 0,
            temp_min: 0        
        }
}

export default function useWeather() {

    const [weather, setWeather] = useState<Weather>(intialState)
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);

    const fetchWeather = async (search: SearchType) => {
        const appid = import.meta.env.VITE_API_KEY;
        setLoading(true);
        setWeather(intialState);
        
        try {
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appid}`
            
            const {data} = await axios(geoUrl);

            if(!data[0]){
                setNotFound(true);
                return
            }
            
            const lat = data[0].lat;
            const lon = data[0].lon;

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`

            //Zod
             const {data: weatherResult} = await axios(weatherUrl);
             const result = Weather.safeParse(weatherResult);
             if(result.success){
                 setWeather(result.data);
             }

            
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
        
    }

    const hasWeatherData = useMemo(() => weather.name, [weather])

    return {
        weather,
        loading,
        notFound,
        fetchWeather,
        hasWeatherData
    }
}
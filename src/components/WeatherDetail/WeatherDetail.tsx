import type { Weather } from "../../hooks/useWeather"

type weatherDetailProps = {
    weather: Weather
}

export default function WeatherDetail({ weather }: weatherDetailProps) {
  return (
    <div>WeatherDetail</div>
  )
}

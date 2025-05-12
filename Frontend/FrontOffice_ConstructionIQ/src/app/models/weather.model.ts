export interface WeatherData {
    weather: Weather[];
    main: Main;
    wind: Wind;
    name: string;
  }
  
  interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  }
  
  interface Wind {
    speed: number;
    deg: number;
  }
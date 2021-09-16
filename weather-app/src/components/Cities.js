import React,{useEffect} from "react";

import {useCity} from '../context/CityContext'
import { useWheather } from "../context/WeatherContext";
function Cities() {
    const cityData=useCity();
    const cities=["Adana","Adiyaman","Afyon","Agri","Aksaray","Amasya","Ankara","Antalya","Ardahan","Artvin","Aydin","Balikesir","Bartin","Batman","Bayburt","Bilecik","Bingol","Bitlis","Bolu","Burdur","Bursa","Canakkale","Cankiri","Corum","Denizli","Diyarbakir","Duzce","Edirne","Elazig","Erzincan","Erzurum","Eskisehir","Gaziantep","Giresun","Gumushane","Hakkari","Hatay","Igdir","Isparta","Istanbul","Izmir","Kahramanmaras","Karabuk","Karaman","Kars","Kastamonu","Kayseri","Kilis","Kirikkale","Kirklareli","Kirsehir","Kocaeli","Konya","Kutahya","Malatya","Manisa","Mardin","Mersin","Mugla","Mus","Nevsehir","Nigde","Ordu","Osmaniye","Rize","Sakarya","Samsun","Sanliurfa","Siirt","Sinop","Sirnak","Sivas","Tekirdag","Tokat","Trabzon","Tunceli","Usak","Van","Yalova","Yozgat","Zonguldak"];

    const WheatherData=useWheather();
   
    const onChange=(e)=>{

      cityData.setCity({name:e.target.value})
    }

    useEffect(() => {
      WheatherData.setWheather([]);
      fetch(`http://api.weatherapi.com/v1/forecast.json?key=724f15d16a404341b15112539211609&q=${cityData.city.name}&days=7&aqi=no&alerts=no
         `)
        .then((res) => res.json())
        .then((result) =>
  
        result.forecast.forecastday.map((forecastday) => {
           return WheatherData.setWheather(old=>[...old,{
                date:forecastday.date ,
                maxTemp:forecastday.day.maxtemp_c,
                minTemp:forecastday.day.mintemp_c,
                icon:forecastday.day.condition.icon
            }])
           
           
          })
        );
    }, [cityData.city]);

  return (
    <div>
        <form className="d-flex  justify-content-center mt-5" >
        <label className="fw-bold">
          choose your city
          <select value={cityData.city.name} className="form-select m-4" onChange={onChange}>
          {
            cities.map((city)=>(
              <option value={city}>{city}</option>
            )
            
            )
          }
           
            
           
          </select>
        </label>
        </form>
        
    </div>
  );
}

export default Cities;

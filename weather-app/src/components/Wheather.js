import React from "react";
import { useWheather } from "../context/WeatherContext";


function Wheather() {
   const wheatherData=useWheather();
   var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div>
      <div className="container">
      <div className="card-group">
            {
                wheatherData.wheather.map((day,i)=>{
                    
                  return (
                   
                    <div key={i} className="card m-3 w-25">
                      <h5 className="card-title mt-3 d-flex justify-content-center">{ days[new Date(day.date).getDay()]}</h5>
                      <img
                        src={day.icon}
                        className=" mx-auto img-thumbnail"
                        alt={day.icon}
                       
                      />
                      <div className="card-body">
                        <p className="card-text d-flex justify-content-around">
                         <span className="badge bg-primary text-ligth fs-2">{day.minTemp}</span>  <span className="badge bg-danger text-ligth fs-2">{day.maxTemp}</span> 
                        </p>
                      </div>
                    </div>
                  
                  )
                })
            }
         
        </div>
      </div>
    </div>
  );
}

export default Wheather;

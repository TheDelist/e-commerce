import React, { createContext, useState, useEffect, useContext } from "react";

const WeatherContext = createContext();

export const WheatherProvider = ({ children }) => {
  const [wheather, setWheather] = useState([]);
  const values = {
    wheather,
    setWheather,
  };
  useEffect(() => {


  }, []);

  return (
    <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
  );
};

export const useWheather = () => useContext(WeatherContext);

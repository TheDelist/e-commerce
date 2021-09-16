import React, { createContext, useState, useContext } from "react";

//Api key:724f15d16a404341b15112539211609

const CityContext = createContext();
export const CityProvider = ({ children }) => {
 
  const [city, setCity] = useState({ name: "London" });
 
  const values = {
    city,
    setCity,
    
  };

 

  return <CityContext.Provider value={values}>{children}</CityContext.Provider>;
};
export const useCity = () => useContext(CityContext);

import "./App.css";
import Cities from "./components/Cities";
import { CityProvider } from "./context/CityContext";
import Wheather from "./components/Wheather";
import { WheatherProvider } from "./context/WeatherContext";

function App() {
  return (
    <div className="App">
      <div className="contianer">
      <CityProvider>
      <WheatherProvider>
          <Cities />
          <Wheather/>
        </WheatherProvider>
      </CityProvider>
      </div>
     
    </div>
  );
}

export default App;

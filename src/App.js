import Forecast from "./components/Forecast";
import Locations from "./components/Locations";
import NotFound from "./components/NotFound";
import Menu from "./components/Menu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState} from "react";

/**
 * The function refers to the various routers in the menu, and holds the state of the list of locations
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
    const [locationsList,setLocations]=useState([]);

    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Menu/>}>
              <Route index element={<Forecast locations={locationsList} />}/>
              <Route path="locations" element={<Locations locations={{locationsList,setLocations}}/>}/>
              <Route path={"*"} element={<NotFound/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;

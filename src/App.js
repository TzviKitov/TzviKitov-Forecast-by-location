import Home from "./components/Home";
import Locations from "./components/Locations";
import NotFound from "./components/NotFound";
import Menu from "./components/Menu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useState} from "react";

function App() {

    const initLocations =[
        { name: 'paris', latitude : 58.343, longitude : 103.99990 },
        { name: 'bbb', latitude : -88.343, longitude : -164.948990 },
        { name: 'ccc', latitude : 14.343, longitude : 139.999443 },
    ];
    const [locations,setLocations]=useState(initLocations);

    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Menu/>}>
              <Route index element={<Home/>}/>
              <Route path="locations" element={<Locations locations={locations}/>}/>
              <Route path={"*"} element={<NotFound/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;

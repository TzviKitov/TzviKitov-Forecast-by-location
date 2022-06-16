import {useState} from "react";
import DisplaysForecastResults from "./DisplaysForecastResults";

const Forecast = (props) => {
    const [selectedLocation, setSelectedLocation] = useState({});
    const [isSelected, setIsSelected] = useState(false);

    const selectLocationsList = props.locations.map((location) =>
        <option key={location.name.toString()} value={location.name} onClick={() => {
            setSelectedLocation(location);
            setIsSelected(false)
            document.getElementById("defaultSelected").classList.remove("bg-light");
        }}>{location.name} </option>
    );

    const locationDetails = () => {
        return (<>{selectedLocation.name ?
            <div className="card w-50">
                <div className="card-body"><h5 className="card-title">{selectedLocation.name}</h5>  <p
                    className="card-text">{selectedLocation.latitude}&deg; , {selectedLocation.longitude}&deg;</p></div>
            </div> : ""}
        </>);
        //else return(<div>""</div>);
    }

    return (
        <>
            {isSelected ? <DisplaysForecastResults theLocation={selectedLocation}/> : ""}
            <div className={"row"}>
                <div className={"col-12 col-md-6 mb-1 mt-4 ml-5"}>

                    <form onSubmit={(event) => {
                        event.preventDefault();
                        if (selectedLocation.name) setIsSelected(true);
                    }}>
                        <select className="form-select" size="8" multiple aria-label="multiple select example">
                            {props.locations.length > 0 ? (<>
                                    <option  id="defaultSelected" className={"bg-light"} value={'readOnly'} onClick={(event) => {
                                        setIsSelected(false);
                                        setSelectedLocation({});
                                        // event.target.className.add("bg-light");
                                    }}>Select a location from the list:
                                    </option>
                                    {selectLocationsList} </>) :
                                <option>No locations yet. Go to the Locations tab to add a location</option>}
                        </select>
                        <button type="submit" className="btn btn-primary mt-3">Show Forecast</button>
                    </form>
                </div>
                <div className={"col-12 col-md-6 mb-2 mt-4 ml-5"}>
                    {locationDetails()}
                </div>
            </div>
        </>);
}

export default Forecast;




// <div className="card w-50">
//     <div className="card-body">
//         <h5 className="card-title">Card title</h5>
//         <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
//         <a href="#" className="btn btn-primary">Button</a>
//     </div>
// </div>

{/*}&deg;*/
}

// <>
//     {selectedLocation?(<>
//         {selectedLocation.name} {selectedLocation.latitude}{','}  {selectedLocation.longitude}
//     </>) : ("")}
// </>
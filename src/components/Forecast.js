import {useState} from "react";
import DisplaysForecastResults from "./DisplaysForecastResults";

/**
 * Management of the forecast page.
 * In case a location is selected, its details will be displayed. Only if a location is selected and the forecast display button is also pressed - the forecast will be displayed.
 Move to another page, or clicking on the default selection bar will reset the forecast display
 * @param props locations list
 * @returns {JSX.Element}
 * @constructor
 */
const Forecast = (props) => {
    const [selectedLocation, setSelectedLocation] = useState({}); //Saves the selected location for immediate details, and for forecasting in the event of a button click
    const [isSelected, setIsSelected] = useState(false); //A flag that lights up when a forecast button is clicked

    /**
     * List of placement options
     */
    const selectLocationsList = props.locations.map((location) =>
        <option key={location.name.toString()} value={location.name} onClick={() => {
            setSelectedLocation(location);
            setIsSelected(false)
            document.getElementById("defaultSelected").classList.remove("bg-light");
        }}>{location.name} </option>
    );

    /**
     * Selected location information
     * @returns {JSX.Element}
     * @constructor
     */
    const LocationDetails = () => {
        return (<>{selectedLocation.name ?
            <div className="card w-50">
                <div className="card-body"><h5 className="card-title">{selectedLocation.name}</h5>  <p
                    className="card-text">{selectedLocation.latitude}&deg; , {selectedLocation.longitude}&deg;</p></div>
            </div> : ""}
        </>);
    }

    return (
        <>
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
                    <LocationDetails/>
                </div>
            </div>
            {isSelected ? <DisplaysForecastResults theLocation={selectedLocation}/> : ""}

        </>);
}

export default Forecast;
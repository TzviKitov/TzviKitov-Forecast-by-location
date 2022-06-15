import AddLocationForm from "./AddLocationForm";

const Locations = (props) => {
    //console.log(props.locations);
    function handleDeleteLocation(){

    }
    const locationsList = props.locations.locationsList.map((location) =>
        <li className="list-group-item d-flex justify-content-between align-items-center"key={location.name}>{location.name}
            <span className="badge">
                <button type="button" className="btn btn-danger text-black" onClick={()=>props.locations.setLocations(props.locations.locationsList.filter(item=>item.name!==location.name))}>x</button>
            </span>
        </li>
    );

    return (
        <div className={"row"}>
            <div className={"col-12 col-md-6 mb-2"}>
            <ul className="list-group mt-3 ml-5">
                <li className="list-group-item active" aria-current="true">Locations:</li>
                {props.locations.locationsList.length > 0 ? locationsList : <p>no locations yet</p>}
            </ul>
            </div>
            <AddLocationForm locations={props.locations}/>
        </div>);
}

export default Locations;
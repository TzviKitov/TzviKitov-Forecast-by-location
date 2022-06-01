import AddLocationForm from "./AddLocationForm";

const Locations = (props) => {
    //console.log(props.locations);

    const listLocations = props.locations.map((location) =>
        <li className="list-group-item d-flex justify-content-between align-items-center">{location.name.toString()}
            <span className="badge">
                <button type="button" className="btn btn-danger text-black">x</button>
            </span>
        </li>
    );

    return (
        <>
            <ul className="list-group mt-3 ml-5">
                <li className="list-group-item active" aria-current="true">Locations:</li>
                {props.locations.length > 0 ? listLocations : <p>no location yet</p>}
            </ul>
            <AddLocationForm/>
        </>);
}

export default Locations;
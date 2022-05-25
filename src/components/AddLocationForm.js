import {Outlet} from "react-router";

export default function AddLocationForm(props) {

    return (

        <form className="border p-3">
            <h2>Add Location:</h2>
            <div className="mb-3 col">
                <label htmlFor="nameInput" className="form-label">Name:</label>
                <input type="text" className="form-control" id="nameInput"/>
            </div>
            <div className="mb-3 col">
                <label htmlFor="latitudeInput" className="form-label">Latitude:</label>
                <input type="number" className="form-control" id="latitudeInput"/>
            </div>
            <div className="mb-3 col">
                <label htmlFor="longitudeInput" className="form-label">Longitude:</label>
                <input type="number" className="form-control" id="longitudeInput"/>
            </div>
            <button type="submit" className="btn btn-primary">Add Location</button>
        </form>
    );
}
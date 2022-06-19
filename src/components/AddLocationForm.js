import {useEffect, useState} from "react";

/**
 * Location addition form, including full and detailed validation
 * @param props  List of locations
 * @returns {JSX.Element}
 * @constructor
 */
export default function AddLocationForm(props) {

    const requiredMessage = " is required";
    const nonNumMessage = "Value must be a decimal number: only a number, a signal minus and a signal dot are allowed";
    const latOutRangeMessage = "Value must be a decimal between -90.0 and 90.0";
    const lonOutRangeMessage = "Value must be a decimal between -190.0 and 190.0";
    const doubleLocationMessage = "The place already exists on the list";

    const [inputs, setInputs] = useState({})
    const [validationInputs, setValidationInputs] = useState({name: {}, latitude: {}, longitude: {}})

    /**
     * single Location Validation
     * @param inputName input string for checking
     */
    function singleLocationValidation(inputName){
       let isSingle =props.locations.locationsList.every( (location)=>location.name!==inputName);
        setValidationInputs(validationInputs => ({
            ...validationInputs,
           name: {
                isValid: isSingle,
                errorMessage: doubleLocationMessage
            }
        }));
    }

    /**
     * Input validation required
     * @param key name of specific input
     * @param val value of specific input
     * @returns {boolean}
     */
    function nonEmptyValidation(key, val) {
        setValidationInputs(validationInputs => ({
            ...validationInputs,
            [key]: {
                isValid: val !== undefined && /^[a-zA-Z. ]+$/.test(val.trim()),
                errorMessage: "Valid " + key + requiredMessage
            }
        }));
        return val !== undefined && /^[a-zA-Z.]+$/.test(val.trim());
    }

    /**
     *Input validation is required for degrees of position
     * @param key name of specific input
     * @param val value of specific input
     */
    function locationsValidation(key, val) {
        let isNonEmpty = val !== undefined && val.trim() !== "";
        nonEmptyValidation(key, val);
        let isnumber = !isNaN(Number(val));
        if (isNonEmpty) {
            setValidationInputs(validationInputs => ({
                ...validationInputs,
                [key]: {isValid: isnumber, errorMessage: nonNumMessage}
            }));
            if (isnumber) {
                setValidationInputs(validationInputs => ({
                    ...validationInputs,
                    [key === "latitude" ? "latitude" : "longitude"]: {
                        isValid: key === "latitude" ? Number(val) >= -90.0 && Number(val) <= 90.0 : Number(val) >= -180.0 && Number(val) <= 180.0,
                        errorMessage: key === "latitude" ? latOutRangeMessage : lonOutRangeMessage
                    }
                }));
            }
        }
    }

    /**
     * Treatment of change in input
     * @param event
     */
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
if(!value) setValidationInputs( validationInputs => ({
    ...validationInputs,
    [name]: {isValid: false, errorMessage: "Valid "+ name+ requiredMessage}
}));
        setInputs({...inputs, [name]: value});
    }

    useEffect(() => {
        if(inputs.name&&nonEmptyValidation("name", inputs.name))
        singleLocationValidation(inputs.name);
    }, [inputs.name]);

    useEffect(() => {
        if(inputs.latitude)locationsValidation("latitude", inputs.latitude)
    }, [inputs.latitude]);

    useEffect(() => {
        if(inputs.longitude) locationsValidation("longitude", inputs.longitude)
    }, [inputs.longitude]);

    /**
     * Handling the submission of the form
     * @param event
     */
    const handleAddLocation = (event) => {
        event.preventDefault();
        const allValidations =Object.entries(validationInputs);
        if(allValidations.every((validation)=>validation[1].isValid)){
            props.locations.setLocations([...props.locations.locationsList, {
                name: inputs.name,
                latitude: inputs.latitude,
                longitude: inputs.longitude
            }]);
            setInputs({});
        }
        else allValidations.forEach((validation)=> {
            if (validation[1].isValid===undefined) setValidationInputs(validationInputs => ({
                ...validationInputs,
                [validation[0]]: {isValid: false, errorMessage: "Valid " + validation[0] + requiredMessage}
            }));
        });
    }

    return (
        <div className={"col-12 col-md-6 mb-2 mb-2 mt-3 ml-5"}>
        <form className="border p-3 bg-light" onSubmit={handleAddLocation}>
            <h2>Add Location:</h2>
            <div className="mb-3 col">
                <label htmlFor="nameInput" className="form-label">Name:</label>
                <input type="text" className="form-control" id="nameInput" name="name" value={inputs.name || ""}
                       onChange={handleChange}/>
                <div
                    className={"text-danger"}> {validationInputs.name.isValid ? "" : validationInputs.name.errorMessage}</div>
            </div>
            <div className="mb-3 col">
                <label htmlFor="latitudeInput" className="form-label">Latitude:</label>
                <input type="text" className="form-control" id="latitudeInput" name="latitude"
                       value={inputs.latitude || ""}
                       onChange={handleChange}/>
                <div
                    className={"text-danger"}> {validationInputs.latitude.isValid ? "" : validationInputs.latitude.errorMessage}</div>
            </div>
            <div className="mb-3 col">
                <label htmlFor="longitudeInput" className="form-label">Longitude:</label>
                <input type="text" className="form-control" id="longitudeInput" name="longitude"
                       value={inputs.longitude || ""}
                       onChange={handleChange}/>
                <div
                    className={"text-danger"}> {validationInputs.longitude.isValid ? "" : validationInputs.longitude.errorMessage}</div>
            </div>
            <button type="submit" className="btn btn-primary">Add Location</button>
        </form>
        </div>
    );
}

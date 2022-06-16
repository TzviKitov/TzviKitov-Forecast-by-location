import {Outlet} from "react-router";
import {useEffect, useState} from "react";

export default function AddLocationForm(props) {

    const requiredMessage = " is required";
    const nonNumMessage = "Value must be a decimal number: only a number, a signal minus and a signal dot are allowed";
    const latOutRangeMessage = "Value must be a decimal between -90.0 and 90.0";
    const lonOutRangeMessage = "Value must be a decimal between -190.0 and 190.0";
    const doubleLocationMessage = "The place already exists on the list";

    const [inputs, setInputs] = useState({})
    const [validationInputs, setValidationInputs] = useState({name: {}, latitude: {}, longitude: {}})
    const [inputsArrValid, setInputsArrValid] = useState(false);

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


    function nonEmptyValidation(key, val) {
        setValidationInputs(validationInputs => ({
            ...validationInputs,
            [key]: {
                isValid: val !== undefined && /^[a-zA-Z. ]+$/.test(val.trim()),
                errorMessage: "Valid " + key + requiredMessage
            }
        }));
        return val !== undefined && /^[a-zA-Z. ]+$/.test(val.trim());
    }

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

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    useEffect(() => {
        console.log(inputs);
        if(inputs.name&&nonEmptyValidation("name", inputs.name))
        singleLocationValidation(inputs.name);
    }, [inputs.name]);

    useEffect(() => {
        if(inputs.latitude)locationsValidation("latitude", inputs.latitude)
    }, [inputs.latitude]);

    useEffect(() => {
        if(inputs.longitude) locationsValidation("longitude", inputs.longitude)
    }, [inputs.longitude]);

    const handleAddLocation = (event) => {
        event.preventDefault();
        const allValidations =Object.entries(validationInputs);
        // if(allValidations.every((validation)=>validation[1].errorMessage)){
        //     setValidationInputs({name: {isValid:false}, latitude: {isValid:false}, longitude: {isValid:false}})
        // }
        if(allValidations.every((validation)=>validation[1].isValid)){
            props.locations.setLocations([...props.locations.locationsList, {
                name: inputs.name,
                latitude: inputs.latitude,
                longitude: inputs.longitude
            }]);
            setInputs({});
        }
        else setValidationInputs({name: {isValid:false,errorMessage: "Valid name" + requiredMessage}, latitude: {isValid:false,errorMessage: "Valid latitude"  + requiredMessage}, longitude: {isValid:false,errorMessage: "Valid longitude"  + requiredMessage}})

        event.preventDefault();
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
                    className={validationInputs.name.isValid ? "" : "text-danger is-invalid"}> {validationInputs.name.isValid ? "" : validationInputs.name.errorMessage}</div>
            </div>
            <div className="mb-3 col">
                <label htmlFor="latitudeInput" className="form-label">Latitude:</label>
                <input type="text" className="form-control" id="latitudeInput" name="latitude"
                       value={inputs.latitude || ""}
                       onChange={handleChange}/>
                <div
                    className={validationInputs.latitude.isValid ? "" : "text-danger is-invalid"}> {validationInputs.latitude.isValid ? "" : validationInputs.latitude.errorMessage}</div>
            </div>
            <div className="mb-3 col">
                <label htmlFor="longitudeInput" className="form-label">Longitude:</label>
                <input type="text" className="form-control" id="longitudeInput" name="longitude"
                       value={inputs.longitude || ""}
                       onChange={handleChange}/>
                <div
                    className={validationInputs.longitude.isValid ? "" : "text-danger is-invalid"}> {validationInputs.longitude.isValid ? "" : validationInputs.longitude.errorMessage}</div>
            </div>
            <button type="submit" className="btn btn-primary">Add Location</button>
        </form>
        </div>
    );
}

//
// function Input(){
//     return(
// <div className="mb-3 col">
//     <label htmlFor="nameInput" className="form-label">Name:</label>
//     <input type="text" className="form-control" id="nameInput" name="name" value={inputs.name || ""}
//            onChange={handleChange}/>
//     <div
//         className={validationInputs.name.isValid ? "" : "text-danger is-invalid"}> {validationInputs.name.isValid ? "" : validationInputs.name.errorMessage}</div>
// </div>);
// }
// function updateValidationInputs() {
//     let allAreValid = true;
//     // let theInputs = Object.entries(inputs);
//     for (let input of Object.entries(inputs)) {
//         if (input[0] !== "name") {
//             if (isNaN(Number(input[1]))) allAreValid = false;
//             setValidationInputs(validationInputs => ({
//                 ...validationInputs,
//                 [input[0]]: {isValid: !isNaN(Number(input[1])), errorMessage: nonNumMessage}
//             }));
//
//
//         }
//
//         if (input[1].length < 1) allAreValid = false;
//         setValidationInputs(validationInputs => ({
//             ...validationInputs,
//             [input[0]]: {isValid: input[1].length > 0, errorMessage: input[0] + requiredMessage}
//         }));
//
//
//     }
//     return false
// }


// if (updateValidationInputs()) { // if the input is less than 5 characters or contains a number
//     setInputsArrValid(false);
// } else {
//     setInputsArrValid(true);
// }

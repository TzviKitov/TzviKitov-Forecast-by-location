import {useEffect, useState} from "react";
import axios from 'axios';

const serverError = "weather forecast service is not available right now, please try again later";

/**
 * Convert a number from a spoken format of a year to a month side by side - to a known date format.
 * @param num of date
 * @returns {string}  known date format.
 */
const numberToDate = (num) => {
    return (num % 100).toString() + "." + (Math.floor((num / 100) % 100)).toString() + "." + Math.floor((num / 10000)).toString();
}

/**
 * A card of a daily date, the date is displayed on the right inside the balloon
 * @param props data list of 7 days as the wear and tear serves the forecast
 * @returns {JSX.Element}
 * @constructor
 */
function ListDayForecast(props) {
    return (
        <ul className="list-group mb-2 mt-3 ml-5">{
            props.dataList.map((day) =>
                <li key={day.date} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <b>Weather: </b> {day.weather}<br></br>
                        <b>Temperatures: </b> {day.temp2m.min}&#8451; &ndash; {day.temp2m.max}&#8451;<br></br>
                        <b>Wind: </b> {day.wind10m_max !== 1 ? day.wind10m_max : "No wind"}<br></br>
                    </div>
                    <span className="badge bg-primary rounded-pill">{numberToDate(day.date)}</span>
                </li>
            )
        }</ul>
    );
}

/**
 * Displays the results of the selected location, a seven-day forecast and a forecast image, in case of a login error, messages will be displayed
 * @param props the selected location
 * @returns {JSX.Element}
 * @constructor
 */
const DisplaysForecastResults = (props) => {
    const [data, setData] = useState({}); // data to be fetched
    const [isLoading, setIsLoading] = useState(false); // is it fetching? For the purpose of presenting a gif
    const [error, setError] = useState({isError: false, msg: ""}); // is there an error? To display error messages

    /**
     * selectedLocation
     */
    useEffect(() => {
        const fetchData = async () => {
            setError(error => ({...error, isError: false})); // reset error state
            setIsLoading(true); // set loading state to true to show loading indicator
            try {
                const result = await axios(`https://www.7timer.info/bin/api.pl?lon=${props.theLocation.longitude}&lat=${props.theLocation.latitude}&product=civillight&output=json`);
                setData(result.data);
            } catch (err) {
                setError({isError: true, msg: err.message}); // an error occurred, set error state to true
            } finally {
                setIsLoading(false); // set loading state to false to hide loading indicator
            }
        };
        fetchData(); // execute the function above
    }, []);

    return (
        <div className={"border p-3 my-4 bg-light"}>
            <div className={"row"}>
                <div className={"col-12 col-md-6 mb-2 mt-3 ml-5"}>
                    <h3> Forecast: {props.theLocation.name}</h3>
                    {isLoading ? (
                        <img className="position-absolute top-50 start-50 translate-middle"
                             src={'/images/loading-buffering.gif'}/>
                    ) : (<>{error.isError ? serverError + " (" + error.msg + ")." : data.dataseries ? <ListDayForecast dataList={data.dataseries}/> : ""}</>)
                    }
                </div>
                <div className={"col-12 col-md-6 mb-2 mt-3 ml-5"}>
                    <div className="px-1 mx-1">
                        <img className={"card-img-top"} src={`https:www.7timer.info/bin/astro.php?%20lon=${props.theLocation.longitude}&lat=${props.theLocation.latitude}&ac=0&lang=en&unit=metric&output=internal&tzshift=0`} onError={(event)=>event.target.src='/images/noPhotoAvailable.jpg'}/>
                    </div>
                </div>
            </div>
        </div>);
};

export default DisplaysForecastResults;

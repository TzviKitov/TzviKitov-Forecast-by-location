import {useEffect, useState} from "react";
import axios from 'axios';

const numberToDate = (num) => {
    return (num % 100).toString() + "." + (Math.floor((num / 100) % 100)).toString() + "." + Math.floor((num / 10000)).toString();
}
const serverError = "weather forecast service is not available right now, please try again later";

function listDayForecast(dataList) {
    return (
        <ul className="list-group mb-2 mt-3 ml-5">{
            dataList.map((day) =>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <b>Weather: </b> {day.weather}<br></br>
                        <b>Temperatures: </b> {day.temp2m.min}&#8451; - {day.temp2m.max}&#8451;<br></br>
                        <b>Wind: </b> {day.wind10m_max !== 1 ? day.wind10m_max : "No wind"}<br></br>
                    </div>
                    <span className="badge bg-primary rounded-pill">{numberToDate(day.date)}</span>
                </li>
            )
        }</ul>
    );
}

const useDataApi = (theUrl) => {
    const [data, setData] = useState({null: "hhhh"}); // data to be fetched
    const [isLoading, setIsLoading] = useState(false); // is it fetching?
    const [error, setError] = useState({isError: false, msg: ""}); // is there an error?
    useEffect(() => {
        const fetchData = async () => {
            setError(error => ({...error, isError: false})); // reset error state
            setIsLoading(true); // set loading state to true to show loading indicator for example
            try {
                const result = await axios(theUrl);
                setData(result.data);
            } catch (err) {
                setError({isError: true, msg: err.message}); // an error occurred, set error state to true
            } finally {
                setIsLoading(false); // set loading state to false to hide loading indicator
            }
        };
        fetchData(); // execute the function above
    }, []);
    return {data, isLoading, error}; // return the data and the URL setter function
};

const DisplaysForecastResults = (props) => {
    const {
        data,
        isLoading,
        error
    } = useDataApi(`https://www.7timer.info/bin/api.pl?lon=${props.theLocation.longitude}&lat=${props.theLocation.latitude}&product=civillight&output=json`);
    console.log(data);
    return (
        <div className={"p-3"}>
            <div className={"row"}>
                <div className={"col-12 col-md-6 mb-2 mt-3 ml-5"}>

                    <h3> Forecast: {props.theLocation.name}</h3>

                    {isLoading ? (
                        <img className="position-absolute top-50 start-50 translate-middle"
                             src={'/images/loading-buffering.gif'}/>

                    ) : (<>{error.isError ? serverError + " (" + error.msg + ")." : data.dataseries ? listDayForecast(data.dataseries) : ""}</>)
                    }

                </div>
                <div className={"col-12 col-md-6 mb-2 mt-3 ml-5"}>
                    <div className="px-1 mx-1">

                        <img
                            src={`https:www.7timer.info/bin/astro.php?%20lon=${props.theLocation.longitude}&lat=${props.theLocation.latitude}&ac=0&lang=en&unit=metric&output=internal&tzshift=0`}/>
                    </div>
                </div>



            </div>
        </div>);
};
export default DisplaysForecastResults;


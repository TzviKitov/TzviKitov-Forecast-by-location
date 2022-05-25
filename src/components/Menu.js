
import {Link} from 'react-router-dom';
import {Outlet} from "react-router";
import {useEffect, useState} from "react";

export default function Menu(props) {

    return (
        <div>
            <h1>My Weather Forecast</h1>

            <a href="/" className="btn btn-primary" aria-current="page">Forecast</a>{' '}
            {/*<Link to="/locations">Locations</Link>*/}
            <a href="/locations" className="btn btn-primary" aria-current="page">Locations</a>
            <Outlet/>
        </div>
    );
}
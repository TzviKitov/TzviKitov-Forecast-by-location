import {Link} from 'react-router-dom';
import {Outlet} from "react-router";

/**
 *The menu manages the links to the various routes, just in case
 * @returns {JSX.Element}
 * @constructor
 */
export default function Menu() {
    return (
        <div>
            <h1>My Weather Forecast</h1>
            <Link className="btn btn-primary mb-3" aria-current="page" to="/">Forecast</Link>{' '}
            <Link className="btn btn-primary mb-3" aria-current="page" to="/locations">Locations</Link>
            <Outlet/>
        </div>
    );
}
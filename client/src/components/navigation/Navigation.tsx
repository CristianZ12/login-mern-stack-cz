import React from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';

const Navigation = () => {

    const history = useHistory();

    const isLoggin = () => {
        if(localStorage.getItem('userLogin')) {
            return(
                <ul className="navbar-nav ml-auto mr-5">
                    <li className="nav-item ml-5">
                        <Link className="nav-link" to="/videos">Videos List</Link>
                    </li>
                    <li className="nav-item ml-5">
                        <Link className="nav-link" to="/addVideos">Add Videos</Link>
                    </li>
                    <li className="nav-item ml-5">
                        <Link className="nav-link" to="" onClick={() => logOut()}>LogOut</Link>
                    </li>
                </ul>
            );
        } else {
            return(
                <ul className="navbar-nav ml-auto mr-5">
                    <li className="nav-item ml-5">
                        <Link className="nav-link" to="/signup">Sign Up</Link>
                    </li>
                    <li className="nav-item ml-5">
                        <Link className="nav-link" to="/signin">Sign In</Link>
                    </li>
                </ul>
            );
        }
    }

    const logOut = () => {
        localStorage.removeItem('userLogin');
        history.push('/signin')
    }

    const homeT = () => {
        if(localStorage.getItem('userLogin')) {
            return '/login';
        } else {
            return '/'
        }
    }

    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to={homeT()} className="navbar-brand ml-5">CJZR</Link>
                <button className="navbar-toggler mr-5" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    {
                        isLoggin()
                    }
                </div>
            </nav>
        </div>
    );
}

export default withRouter(Navigation);
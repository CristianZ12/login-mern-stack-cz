import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return(
        <div className="row">
            <div className="col-sm-10 col-md-10 col-xl-8 mx-auto">
                <div className="card">
                    <div className="card-body">
                        <p className="card-title">
                            Welcome to my application web of Videos, by start please give click in this button.
                        </p>
                        <Link className="btn btn-primary btn-block" to="/signin">SignIn</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
import React from 'react';
import axios from 'axios';
import LoginI from '../models/LoginI';

const Login = () => {

    const initalValuesUser:LoginI = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        role: 0,
        state: 0
    }

    const URI:string = 'https://contact-mern-stack-cjzr-1.herokuapp.com/login'

    const [user, setUser] = React.useState(initalValuesUser);

    const getUsers = async () => {
        const headers1 = {
            headers: {
                'Authorization': localStorage.getItem('userLogin')
            }
        }
        const userData = await axios.get(URI, headers1)
        const data:LoginI = {
            firstName: userData.data.user.firstName,
            lastName: userData.data.user.lastName,
            username: userData.data.user.username,
            email: userData.data.user.email,
            role: userData.data.user.role,
            state: userData.data.user.state
        }
        setUser(data);
    }

    const setRol = (rol:number) => {
        if(rol === 1) {
            return(
                <span className="card-text font-weight-normal">Admin</span>
            );
        } else if(rol === 2) {
            return(
                <span className="card-text font-weight-normal">Customer</span>
            );
        }
    }

    const setState = (state:number) => {
        if(state === 1) {
            return(
                <span className="card-text font-weight-normal">Active</span>
            );
        } else {
            return(
                <span className="card-text font-weight-normal">Inactive</span>
            );
        }
    }

    React.useEffect(() => {
        getUsers();
    }, []);

    return(
        <div className="row">
            <div className="col-sm-10 col-md-10 col-xl-7 mx-auto">
                <div className="card">
                    <div className="card-header text-center">
                        <h3 className="card-title">USER DATA</h3>
                    </div>
                    <div className="card-body">
                        <p className="card-title font-weight-bold">Full Name: <span className="card-text font-weight-normal">{user.firstName} {user.lastName}</span></p>
                        <p className="card-title font-weight-bold">User Name: <span className="card-text font-weight-normal">{user.username}</span></p>
                        <p className="card-title font-weight-bold">Email: <span className="card-text font-weight-normal">{user.email}</span></p>
                        <p className="card-title font-weight-bold">Role: { setRol(user.role) } </p>
                        <p className="card-title font-weight-bold">State: { setState(user.state) } </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
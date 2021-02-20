import React from 'react';
import { useHistory } from 'react-router-dom';

import Login from './Login';

const LoginValidate = () => {

    const history = useHistory();

    React.useEffect(() => {
        validate2();
    });

    const validate2 = () => {
        if(localStorage.getItem('userLogin') === null) {
            return history.push('/signin');
        }
    }

    const validate = () => {
        if(localStorage.getItem('userLogin')) {
            return (
                <Login />
            );
        } else {
            return(
                <div></div>
            );
        }
    }

    return(
        validate()
    );
}

export default LoginValidate;
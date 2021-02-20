import React from 'react';
import { useHistory } from 'react-router-dom';

import SignIn from './SignIn';

const ValidateSignIn = () => {

    const history = useHistory();

    React.useEffect(() => {
        if(localStorage.getItem('userLogin')) {
            return history.push('/login');
        }
    });

    const validate = () => {
        if(localStorage.getItem('userLogin')) {
            return(
                <div></div>
            );
        } else {
            return(
                <SignIn />
            );
        }
    }

    return(
        validate()
    );

}

export default ValidateSignIn;
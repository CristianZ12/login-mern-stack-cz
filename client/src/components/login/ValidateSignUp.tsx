import React from 'react';
import { useHistory } from 'react-router-dom';

import SignUp from './SignUp';

const ValidateSignUp = () => {

    const history = useHistory();

    React.useEffect(() => {
        if(localStorage.getItem('userLogin')) {
            return history.push('/signin');
        }
    });

    const validate = () => {
        if(localStorage.getItem('userLogin')) {
            return(
                <div></div>
            );
        } else {
            return(
                <SignUp />
            );
        }
    }

    return(
        validate()
    );

}

export default ValidateSignUp;
import React from 'react';
import { useHistory } from 'react-router-dom';

import VideosForm from './VideosForm';

const ValidateVideosForm = () => {

    const history = useHistory();

    React.useEffect(() => {
        if(localStorage.getItem('userLogin') === null) {
            return history.push('/signin');
        }
    });

    const validate = () => {
        if(localStorage.getItem('userLogin')) {
            return (
                <VideosForm />
            );
        } else {
            return (
                <div></div>
            );
        }
    }

    return (
        validate()
    );
}

export default ValidateVideosForm;
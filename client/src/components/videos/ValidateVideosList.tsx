import React from 'react';
import { useHistory } from 'react-router-dom';

import VideosList from './VideosList';

const ValidateVideosList = () => {
    
    const history = useHistory();

    React.useEffect(() => {
        if(localStorage.getItem('userLogin') === null) {
            history.push('/signin');
        }
    });

    const validate = () => {
        if(localStorage.getItem('userLogin')) {
            return (
                <VideosList />
            );
        } else {
            return (
                <div></div>
            );
        }
    }
    
    return(
        validate()
    );
}

export default ValidateVideosList;
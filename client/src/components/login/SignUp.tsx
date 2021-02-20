import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import UsersI from '../models/Users';

type ChangeInputForm = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
type SubmitForm = React.FormEvent<HTMLFormElement>

const SignUp = () => {
    
    const history = useHistory();

    const URI:string = 'https://contact-mern-stack-cjzr-1.herokuapp.com/users/signup';

    const initialValuesR:UsersI = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
    }

    const [registerU, setRegisterU] = React.useState(initialValuesR);

    const onChangeInputs = (e: ChangeInputForm) => {
        const { name, value } = e.target;
        setRegisterU({...registerU, [name]: value });
    }

    const handleSubmit = async (e: SubmitForm) => {
        e.preventDefault();
        const postData:UsersI = {
            firstName: registerU.firstName,
            lastName: registerU.lastName,
            username: registerU.username,
            email: registerU.email,
            password: registerU.password
        }
        const dataPost = await axios.post(URI, postData);
        const message = dataPost.data.message;
        if(message.msgError) {
            toast(message.msgBody, {
                type: 'error'
            });
        } else {
            toast(message.msgBody, {
                type: 'success'
            });
            history.push('/signin');
            return;
        }
    }

    return(
        <div className="row">
            <div className="col-sm-10 col-md-10 col-xl-6 mx-auto">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title text-center">SIGN UP</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control" name="firstName" placeholder="First Name" onChange={onChangeInputs} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" name="lastName" placeholder="Last Name" onChange={onChangeInputs} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" name="username" placeholder="UserName" onChange={onChangeInputs} />
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control" name="email" placeholder="Email" onChange={onChangeInputs} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" name="password" placeholder="Password" onChange={onChangeInputs} />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block" type="submit">Sign Up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
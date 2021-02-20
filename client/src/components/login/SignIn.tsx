import React from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import UsersSignInI from '../models/UsersSignIn';

type ChangeInputT = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
type SubmitForm = React.FormEvent<HTMLFormElement>

const SignIn = () => {
    
    const initialValuesLogin:UsersSignInI = {
        email: '',
        password: ''
    }

    const history = useHistory();

    const URI:string = 'https://contact-mern-stack-cjzr-1.herokuapp.com/users/signin'

    const [loginV, setLoginV] = React.useState(initialValuesLogin);
    
    const onChangeInputs = (e:ChangeInputT) => {
        const { name, value } = e.target;
        setLoginV({...loginV, [name]: value });
    }

    const handleSubmit = async (e:SubmitForm) => {
        e.preventDefault();
        const loginPost:UsersSignInI = {
            email: loginV.email,
            password: loginV.password
        }
        const dataPost = await axios.post(URI, loginPost);
        const message = dataPost.data.message;
        if(message.msgError) {
            toast(message.msgBody, {
                type: 'error'
            });
        } else {
            toast(message.msgBody, {
                type: 'success'
            });
            localStorage.setItem('userLogin', `Behavior ${dataPost.data.token}`);
            history.push('/login')
        }
    }

    return(
        <div className="row">
            <div className="col-sm-10 col-md-10 col-xl-6 mx-auto">
                <div className="card">
                    <div className="card-header text-center">
                        <h3 className="card-title">Sign In</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="email" className="form-control" name="email" placeholder="Email" onChange={onChangeInputs} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" name="password" placeholder="Password" onChange={onChangeInputs} />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-block btn-primary">Sign In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
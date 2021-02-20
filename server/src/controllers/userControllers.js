const userControllers = {};
const UserModels = require('../models/Users');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

userControllers.signUp = async (req, resp) => {
    try {
        let { firstName, lastName, username, email, password } = req.body;
        if(!firstName || !lastName || !username || !email || !password) {
            return resp.status(200).json({ message: {
                msgError: true,
                msgBody: 'Not all fields have been entered.'
            }});
        }
        if(password.length < 5) {
            return resp.status(200).json({ message: {
                msgError: true,
                msgBody: 'The password needs to be at least 5 characters long.'
            }});
        }
        const existUser = await UserModels.findOne({ email });
        const existUser2 = await UserModels.findOne({ username });
        if(existUser) {
            return resp.status(200).json({ message: {
                msgError: true,
                msgBody: 'An account with this email already exists.'
            }});
        } else if(existUser2) {
            return resp.status(200).json({ message: {
                msgError: true,
                msgBody: 'An account with this username already exists.'
            }});
        } else if(existUser && existUser2) {
            return resp.status(200).json({ message: {
                msgError: true,
                msgBody: 'An account with this email and username already exists.'
            }});
        }
        if(!existUser && !existUser2) {
            var role = 0;
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
            const vEmail = email.split('@')[1];
            if(vEmail === 'admin.com') {
                role = 1;
            } else {
                role = 2;
            }
            const dataSave = {
                firstName,
                lastName,
                username,
                email,
                password: passwordHash,
                role
            }
            const newUser = new UserModels(dataSave);
            newUser.save((err, user) => {
                if(err) {
                    console.log(err)
                    resp.status(200).json({ message: {
                        msgError: true,
                        msgBody: 'Unable to Add User in Database.'
                    }});
                    return;
                } else {
                    resp.status(200).json({ message: {
                        msgError: false,
                        msgBody: 'Successfully Added User in Database.'
                    }});
                    return;
                }
            });
        }
    } catch(err) {
        resp.status(500).json({ error: err.message });
        console.log(err.message);
    }
}

userControllers.signIn = async (req, resp) => {
    try {
        const { email, password } = req.body;
        //Validate
        if(!email || !password) {
            return resp.status(200).json({ message: {
                msgError: true,
                msgBody: 'Not all fields have been entered.'
            }});
        }
        const user = await UserModels.findOne({ email });
        if(!user) {
            return resp.status(200).json({ message: {
                msgError: true,
                msgBody: 'No account with this email has been registered.'
            }});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return resp.status(200).json({ message: {
                msgError: true,
                msgBody: 'Invalid credentials.'
            }});
        }
        const payload = {
            id: user._id
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        resp.json({ token, message: {
            msgError: false,
            msgBody: 'Successfully SignIn User.'
        }});

    } catch(err) {
        resp.status(500).json({ error: err.message });
    }
}

userControllers.getUser = (req, resp) => {
    const id = req.userId;
    UserModels.findOne({_id: id }, (err, user) => {
        if(err) {
            return resp.status(200).json({ message: {
                msgError: true,
                msgBody: 'Unabled to Add User.'
            }});
        } else {
            return resp.status(200).json({ user });
        }
    });
}

module.exports = userControllers;
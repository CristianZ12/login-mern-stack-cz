const jwt = require('jsonwebtoken');

const auth = async (req, resp, next) => {
    try {
        if(!req.headers.authorization) {
            return resp.status(200).json({ message: {
                msgError: true,
                msgBody: 'Unauhtorized Request.'
            }});
        }
        let token = req.headers.authorization.split(' ')[1];
        if(token === 'null') {
            return resp.status(200).json({ message: {
                msgError: true,
                msgBody: 'Unauhtorized Request.'
            }});
        }
        const payload = await jwt.verify(token, process.env.JWT_SECRET);
        if(!payload) {
            return resp.status(200).json({ message: {
                msgError: true,
                msgBody: 'Unauhtorized Request.'
            }});
        }
        req.userId = payload.id;
        next();
    } catch(err) {
        return resp.status(401).json({ message: 'Unauhtorized Request' });
    } 
}

module.exports = auth;
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const userRouter = require('../routes/userRouter');
const videosRouter = require('../routes/videosRouter');

module.exports = (app) => {
    //Setting
    app.set('Port', process.env.PORT || 3500);

    //Middlewares
    app.use(cors());
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    //Router
    app.use(userRouter);
    app.use('/api/videos', videosRouter)

    return app;
}
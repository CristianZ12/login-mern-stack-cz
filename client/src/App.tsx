import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'bootswatch/dist/lux/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';

import Navigation from './components/navigation/Navigation';
import Home from './components/home/Home';
import ValidateSignUp from './components/login/ValidateSignUp';
import ValidateSignIn from './components/login/ValidateSignIn';
import LoginValidate from './components/home/LoginValidate';
import ValidateVideosList from './components/videos/ValidateVideosList';
import ValidateVideosForm from './components/videos/videos-form/ValidateVideosForm';

function App() {
  return (
    <Router>
      <Navigation />
      <ToastContainer />
      <div className="container mt-5">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/signup" component={ValidateSignUp} />
          <Route path="/signin" component={ValidateSignIn} />
          <Route path="/login" component={LoginValidate} />
          <Route path="/videos" component={ValidateVideosList} />
          <Route path="/addVideos" component={ValidateVideosForm} />
          <Route path="/video/:id" component={ValidateVideosForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

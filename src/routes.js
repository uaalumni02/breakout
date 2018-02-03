import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './js/components/home/Home';
import Login from './js/components/auth/Login';
import Signup from './js/components/auth/Signup';
import MediaList from './js/components/media/MediaList';
import Media from './js/components/media/Media';
import Profile from './js/components/user/Profile';



import App from './js/App';

export default (
  <App>
    <Switch>
      <Route exact path="/" component={ Home } />
      {/* <Route path="/auth/login" component={Sample} /> */}
      <Route exact path="/login" component={ Login } />

      <Route exact path="/signup" component={ Signup } />

      <Route exact path="/medialist" component= { MediaList } />

      <Route exact path="/media/:media_id" component= { Media } />

      <Route exact path="/user/:username" component= { Profile } />

      {/* { <Route exact path="/signup" component={ Signup } /> */} */}

    </Switch>
  </App>
);

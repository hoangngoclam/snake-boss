import React from 'react';
import LoginPage from './pages/login.page';
import RegisterPage from './pages/register.page';
import IndexPage from './pages/index.page';
import UserAdminPage from './pages/useradmin.page'
import GamePage from './pages/game.page';
import ProfilePage from './pages/profile.page';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function requireAuth() {
  let userStore = localStorage.getItem("user");
  if(!userStore){
    return false
  }
  return true
}


 function App(){
  let auth = requireAuth()
  return (
    <Router>
      {
        auth?
        <Switch>
        <Route path="/game" exact onEnter={requireAuth}>
          <GamePage />
        </Route>
        <Route path="/profile" exact onEnter={requireAuth}>
          <ProfilePage />
        </Route>
        <Route path="/user-admin" exact onEnter={requireAuth}>
          <UserAdminPage />
        </Route>
        <Route path="/" >
          <IndexPage />
        </Route>
      </Switch>:
        <Switch>
          <Route path="/register" exact>
            <RegisterPage />
          </Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      }
      
    </Router>
  );
}

export default App;

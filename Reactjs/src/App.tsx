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
} from "react-router-dom";
import API from './helper';
function App() {
  function requireAuth(nextState: { location: { pathname: any; }; }, 
    replace: (arg0: { pathname: string; state: { nextPathname: any; }; }) => void, next: () => void) {
      let userStore = localStorage.getItem("user");
      if(!userStore){
        replace({
          pathname: "/login",
          state: {nextPathname: nextState.location.pathname}
        });
      }
      else{
        API.Post("http://localhost:5000/user/login",JSON.parse(userStore))
        .then(data=>{
          
        })
      }
    let data: IDataReceiveLogin;
     
    if (!authenticated) {
      replace({
        pathname: "/login",
        state: {nextPathname: nextState.location.pathname}
      });
    }
    next();
  }
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <IndexPage />
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/register" exact>
          <RegisterPage />
        </Route>
        <Route path="/game" exact onEnter={requireAuth}>
          <GamePage />
        </Route>
        <Route path="/profile" exact>
          <ProfilePage />
        </Route>
        <Route path="/user-admin" exact>
          <UserAdminPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

import React from 'react';
import LoginPage from './pages/login.page';
import RegisterPage from './pages/register.page';
import IndexPage from './pages/index.page';
import UserAdminPage from './pages/useradmin.page';
import GamePage from './pages/game.page';
import ProfilePage from './pages/profile.page';
import AdminLoginPage from './pages/AdminLogin.page';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute.component';
import ProtectedRouteAdmin from './components/ProtectedRouteAdmin.components';
function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={LoginPage} exact />
                <Route path="/register" component={RegisterPage} exact />
                <ProtectedRoute path="/" component={IndexPage} exact />
                <ProtectedRoute path="/game" component={GamePage} exact />
                <ProtectedRoute path="/profile" component={ProfilePage} exact />
                <ProtectedRouteAdmin path="/user-admin" component={UserAdminPage} exact />
                <Route path="/admin/login" component={AdminLoginPage} exact />
            </Switch>
        </Router>
    );
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
//pages
import home from './Pages/home';
import user from './Pages/user';
import login from './Pages/login';
import signup from './Pages/signup';
import settings from './Pages/settings';
import forgotPassword from './Pages/forgotPassword';
import settingsPassword from './Pages/settings/settingsPassword';
import settingsEmail from './Pages/settings/settingsEmail';
import settingsDelete from './Pages/settings/settingsDelete';

//components
import Navbar from './Components/Navbar';
import AuthRoute from './util/AuthRoute';

//redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userAction';
import axios from 'axios';
// import themeObject from './util/theme';

toast.configure();

// const theme = createMuiTheme(themeObject);

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4', //color primary have this  //green-#43a047
      dark: '#008394',
      contrastText: '#fff' //text color on element
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00', //color secondary have this
      dark: '#b22a00',
      contrastText: '#fff'
    }
  },
  typography: {
    useNextVariants: true
  }
});

const token = localStorage.FBIdToken;

if (token) {
  //decode firebase token to set expiry date
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />

                <Route exact path="/settings" component={settings} />
                <Route
                  exact
                  path="/settingsPassword"
                  component={settingsPassword}
                />
                <Route
                  exact
                  path="/settingsDelete"
                  component={settingsDelete}
                />
                <Route exact path="/settingsEmail" component={settingsEmail} />
                <Route exact path="/user" component={user} />
                <Route exact path="/:handle/ad/:adId" component={home} />
                <Route exact path="/user/:handle/ad/:adId" component={user} />
              </Switch>
            </div>
            <div className="container2">
              <Switch>
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
                <AuthRoute
                  exact
                  path="/forgotPassword"
                  component={forgotPassword}
                />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;

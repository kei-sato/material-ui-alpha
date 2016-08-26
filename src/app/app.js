import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory, Router, Route, IndexRoute } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore from '../store/configureStore';
import Main from './Main'; // Our custom react component
import { MyPage, Login, Logout, Dashboard } from './mypage';

//Needed for React Developer Tools
window.React = React;

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// appended during server side rendering
const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState, browserHistory);

const About = React.createClass({
  render() {
    return <h1>About</h1>
  }
});

function requireAuth(nextState, replace, callback) {
  const { user: { isAuthenticated }} = store.getState();
  if (!isAuthenticated) {
    replace({
      pathname: '/mypage/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
  callback();
}

const rootComponent = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/">
        <IndexRoute component={Main} />
        <Route path="about" component={About} />
        <Route path="mypage" component={MyPage}>
          <IndexRoute component={Dashboard} onEnter={requireAuth} />
          <Route path="login" component={Login} />
        </Route>
      </Route>
    </Router>
  </Provider>
);
const rootElement = document.getElementById('app');

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
render(rootComponent, rootElement);

// work around for HMR error
// https://gist.github.com/gaearon/06bd9e2223556cb0d841
if (module.hot) {
  module.hot.accept('./Main', function () {
    // Require the new version and render it instead
    render(rootComponent, rootElement);
  })
}

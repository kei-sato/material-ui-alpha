import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore from '../store/configureStore';
import Main from './Main'; // Our custom react component

//Needed for React Developer Tools
window.React = React;

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const store = configureStore();

const rootComponent = (
  <Provider store={store}>
    <Main />
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

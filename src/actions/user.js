// Including es6-promise so isomorphic fetch will work
import 'es6-promise';
import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { types } from '../constants';

function makeRequest(method='post', api='/', data) {
  return fetch(api, {
    method: method,
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

export function login(username, password) {
  return dispatch => {
    return makeRequest('post', '/user/login', { username, password })
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: types.LOGIN_SUCCESS, user: { username } });
          return dispatch(push('/mypage/'));
        } else {
          return dispatch({ type: types.LOGIN_FAILED });
        }
      });
  };
}

export function logout() {
  return dispatch => {
    return makeRequest('post', '/user/logout')
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: types.LOGOUT_SUCCESS });
          return dispatch(push('/mypage/login'));
        } else {
          return dispatch({ type: types.LOGOUT_FAILED });
        }
      });
  };
}

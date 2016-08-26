import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Navigation from './Navigation';
import { userActions } from '../../actions';

const MyPage = ({children, user, actions}) => {
  return (
    <div>
      <Navigation user={user} logout={actions.logout} />
      { children && React.cloneElement(children, { user, actions }) }
    </div>
  );
};

MyPage.propTypes = {
  children: PropTypes.object,
  user: PropTypes.object,
  actions: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({ user: state.user }), // map state to props
  (dispatch) => ({ actions: bindActionCreators(userActions, dispatch) }) // wrap actions with dispatches
)(MyPage);

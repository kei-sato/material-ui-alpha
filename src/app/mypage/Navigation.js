import React, { PropTypes, Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FontIcon from 'material-ui/FontIcon';
import {cyan500} from 'material-ui/styles/colors';

const muiTheme = getMuiTheme();

class Navigation extends Component {
  constructor(props, context) {
    super(props, context);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.state = { open: false };
  }

  toggleMenu() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { user = {}, logout = () => {} } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            title=""
            onTouchTap={this.toggleMenu}
            onTitleTouchTap={this.toggleMenu}
          />
          <Drawer
            open={this.state.open}
            docked={false}
            onRequestChange={(open) => this.setState({open})}
          >
            <MenuItem
              primaryText="閉じる"
              onTouchTap={this.toggleMenu}
              leftIcon={<FontIcon className="material-icons" style={{ color: 'white' }}>arrow_back</FontIcon>}
              style={{ backgroundColor: cyan500, color: 'white' }}/>
            <MenuItem primaryText="マイページ" href="/mypage/" />
            {
              user.isAuthenticated ?
              (<MenuItem primaryText="ログアウト" onTouchTap={logout} />) :
              (<MenuItem primaryText="ログイン" href="/mypage/login" />)
            }
          </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
}

Navigation.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
};

export default Navigation;

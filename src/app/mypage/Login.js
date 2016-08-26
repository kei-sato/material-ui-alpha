import React, { PropTypes, Component } from 'react';
import { withRouter } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const muiTheme = getMuiTheme();

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 120,
  },
};

class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.submit = this.submit.bind(this);
    this.state = {};
  }

  onChangeUsername(e) {
    const { target: { value }} = e;
    this.setState({ username: value, errorTextUserId: '' });
  }

  onChangePassword(e) {
    const { target: { value }} = e;
    this.setState({ password: value, errorTextPassword: '' });
  }

  submit() {
    const { actions: { login }, router } = this.props;
    const { username, password } = this.state;

    if (!username) return this.setState({ errorTextUserId: 'IDがありません' });
    if (username.length < 3) return this.setState({ errorTextUserId: 'IDが短すぎます' });
    if (!password) return this.setState({ errorTextPassword: 'パスワードがありません' });
    if (password.length < 3) return this.setState({ errorTextPassword: 'パスワードが短すぎます' });

    login(username, password);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <TextField
            hintText="英数字3文字以上"
            floatingLabelText="ID"
            onChange={this.onChangeUsername}
            errorText={this.state.errorTextUserId}
          /><br />
          <TextField
            hintText="英数字3文字以上"
            floatingLabelText="パスワード"
            type="password"
            onChange={this.onChangePassword}
            errorText={this.state.errorTextPassword}
          /><br />
          <RaisedButton
            label="ログイン"
            primary={true}
            style={{margin:30}}
            onTouchTap={this.submit}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(Login);

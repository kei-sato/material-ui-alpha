/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deepOrange500 } from 'material-ui/styles/colors';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { todoActions } from '../actions';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
  chip: {
    margin: 4,
  },
  wrapper: {
    width: '50%',
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onKeyDown(event) {
    const { actions } = this.props;
    const { key, target } = event;
    const { value } = target;

    if (key === 'Enter' && value) {
      actions.addTodo(value);
      target.value = '';
    }
  }

  render() {
    const { todos, actions } = this.props;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <div style={styles.wrapper}>
            {
              todos.map((todo,i) => (
                <Chip
                  key={i}
                  style={styles.chip}
                  onRequestDelete={() => actions.deleteTodo(todo.id)}
                >
                  {todo.text}
                </Chip>
              ))
            }
          </div>
          <TextField
            hintText="say something"
            onKeyDown={this.onKeyDown}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

Main.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({todos: state.todo}), // map state to props
  (dispatch) => ({actions: bindActionCreators(todoActions, dispatch)}) // wrap actions with dispatches
)(Main);

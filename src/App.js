import React, { Component } from "react";
import "./App.css";
import { hot } from "react-hot-loader";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  }
});

class App extends Component {

  componentDidMount() {
    const { fetchMemoList } = this.props;
    fetchMemoList();  
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <TextField
          id="name"
          label="Name"
          className={classes.textField}
          value={this.props.value}
          margin="normal"
        />

        <Button variant="contained" color="primary">
          Hello, World!
        </Button>
      </div>
    );
  }
}

export default withStyles(styles)(App);
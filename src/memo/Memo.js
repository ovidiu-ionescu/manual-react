import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

function MemoEntry(props) {
  const { classes, memo, fetchMemo } = props;
  const change = (event, expanded) => {
    fetchMemo(memo.id);
  }
  return (
    <ExpansionPanel key={'memo_' + memo.id} onChange={change} >
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography className={classes.heading}>{memo.title}</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Typography>
        Loading...
      </Typography>
    </ExpansionPanelDetails>
  </ExpansionPanel>
  );
}


class MemoList extends Component {

  componentDidMount() {
    const { fetchMemoList } = this.props;
    fetchMemoList();  
  }
  render() {
    const { classes, state, fetchMemo } = this.props;
    const memos = state.memoList || [];
    return (
      <div className={classes.root}>
      {memos.map((memo)=> MemoEntry({classes, memo, fetchMemo}))}
      </div>
    );
  }
}

MemoList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MemoList);
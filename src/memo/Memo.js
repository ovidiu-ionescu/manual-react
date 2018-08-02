import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

function MemoBody(props) {
  const { classes, content } = props;
  return (
    <TextField multiline="true" value={content}/>
  )
}

function MemoEntry(props) {
  const { classes, memoTitle, fetchMemo, memo } = props;
  const change = (event, expanded) => {
    !memo && fetchMemo(memoTitle.id);
  }
  const content = memo && memo.memotext || "Loading..."

  return (
    <ExpansionPanel key={'memo_' + memoTitle.id} onChange={change} >
    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
      <Typography className={classes.heading}>{memoTitle.title}</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Typography>
        {MemoBody({classes, content})}
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
    const memoList = state.memoList || [];
    return (
      <div className={classes.root}>
      {memoList.map((memoTitle)=> MemoEntry({classes, memoTitle, fetchMemo, memo: state.memos[memoTitle.id]}))}
      </div>
    );
  }
}

MemoList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MemoList);
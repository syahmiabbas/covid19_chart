import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

class OptionButtons extends React.Component {
    classes = makeStyles((theme) => ({
      margin: {
        margin: theme.spacing(1),
      },
      extendedIcon: {
        marginRight: theme.spacing(1),
      },
    }));

    selectBtn = (e) => {
      this.props.buttonOption(e.currentTarget.value);
    }
    render() {
    return (
      <div>
          <Button variant="outlined" size="large" color="primary" className={this.classes.margin} onClick={(e) => this.selectBtn(e)} value="charts">
            View Charts
          </Button>
          <Button variant="outlined" size="large" color="primary" className={this.classes.margin} onClick={(e) => this.selectBtn(e)} value="ranking">
            View Ranking
          </Button>
      </div>
    );
    }
}

export default OptionButtons;
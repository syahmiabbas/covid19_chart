import React from 'react';
import Button from '@material-ui/core/Button';

import styles from './OptionButtons.module.css';

class OptionButtons extends React.Component {

    selectBtn = (e) => {
      this.props.buttonOption(e.currentTarget.value);
      e.currentTarget.innerHTML == "View Charts" ? e.currentTarget.innerHTML = "View Ranking" : e.currentTarget.innerHTML = "View Charts";
    }
    render() {
    return (
      <div>
          <Button variant="outlined" size="large" color="primary" className={styles.buttons} onClick={(e) => this.selectBtn(e)} value="charts">
            View Ranking
          </Button>
      </div>
    );
    }
}

export default OptionButtons;
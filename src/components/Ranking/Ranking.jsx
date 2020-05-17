import React, { Component } from 'react'
import { Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';

import styles from './Ranking.module.css';

import { fetchRankings } from '../../api';

export class Ranking extends Component {

    state = {
        data: []
    }
    async componentDidMount(){
        this.setState({data: await fetchRankings()});
    }
    render() {
      const { data } = this.state;
        return (
          <div>
          <Typography
            component="span"
            variant="h4"
            className={styles.icon}
            color="textPrimary"
          >
          Top 10 highest cases by country
          </Typography>
          <List className={styles.list}>
            {data.slice(0, 10).map((items, i) => 
              <ListItem key={i} className={styles.listItem}>
                  <ListItemIcon>
                    <Typography
                        component="span"
                        variant="h5"
                        className={styles.icon}
                        color="textPrimary"
                      >   
                    {i + 1}
                    </Typography>
                  </ListItemIcon>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="h5"
                        className={styles.mainHeader}
                        color="textPrimary"
                      >
                      {items.countryRegion}
                      </Typography>
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="subtitle1"
                        className={styles.inline}
                        color="textPrimary"
                      >
                      Confirmed: {items.confirmed} Active: {items.active} Deaths: {items.deaths}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            )}
          </List>
          </div>
        )
    }
}

export default Ranking

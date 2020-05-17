import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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
        
        return (
    <List className={styles.list}>
        {/* {fetchRankings} */}
        {/* {fetchRankings.map((items, i) => 
      <ListItem key={i}>
          <Avatar>
            {i}
          </Avatar>
        <ListItemText primary={items.combinedKey} secondary={items.confirmed} />
      </ListItem>
      )} */}
    </List>
        )
    }
}

export default Ranking

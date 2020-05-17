import React from 'react';
import {Card, CardContent, Typography, Grid} from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';

import styles from './Cards.module.css';

const Cards = ({data: {confirmed, recovered, deaths, lastUpdate, percentageRecovered, percentageDeaths}, previousData: {prevConfirmed, prevRecovered, prevDeaths}}) => {
    if(!confirmed){
        return "Loading ...";
    }
    return (
        <div className={styles.container}>
            <Grid container spacing={5} justify="center">
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Infected</Typography>
                        <Typography variant="h5">
                            <CountUp start = {0} duration={2.5} separator="," end={confirmed.value}/><br/>
                            <span className={styles.wordsInfected}>( + <CountUp start = {0} duration={2.5} separator="," end={prevConfirmed}/>)</span>
                        </Typography>
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString() }</Typography>
                        <Typography variant="body2">Total cases of COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>                    
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                        <Typography variant="h5">
                            <CountUp start = {0} duration={2.5} separator="," end={recovered.value}/> <span className={styles.wordsRecovered}>({percentageRecovered}%)</span><br/>
                            <span className={styles.wordsRecovered}>(+ <CountUp start = {0} duration={2.5} separator="," end={prevRecovered}/>)</span>
                        </Typography>
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString() }</Typography>
                        <Typography variant="body2">Recoveries of COVID-19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>                    
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                        <Typography variant="h5">
                            <CountUp start = {0} duration={2.5} separator="," end={deaths.value}/> <span className={styles.wordsDeaths}>({percentageDeaths}%)</span><br/>
                            <span className={styles.wordsDeaths}>(+ <CountUp start = {0} duration={2.5} separator="," end={prevDeaths}/>)</span>
                        </Typography>
                        <Typography color="textSecondary">{new Date(lastUpdate).toDateString() }</Typography>
                        <Typography variant="body2">Deaths by COVID-19</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

export default Cards;
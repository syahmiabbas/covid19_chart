import React from 'react';

import {Cards, Chart, CountryPicker } from './components'
import styles from './App.module.css'
import {fetchData, fetchPreviousDayData} from './api';

import coronaImage from './images/image.png';

class App extends React.Component {
  
  state = {
    data: {},
    previousData: {},
    country: ''
  }

  async componentDidMount(){
    const fetchedData = await fetchData();
    const previousFetchedData = await fetchPreviousDayData();

    previousFetchedData.prevConfirmed = fetchedData.confirmed.value - previousFetchedData.prevConfirmed;
    previousFetchedData.prevDeaths = fetchedData.deaths.value - previousFetchedData.prevDeaths;
    previousFetchedData.prevRecovered = fetchedData.recovered.value - previousFetchedData.prevRecovered;
    
    this.setState({data: fetchedData, previousData: previousFetchedData});
  }

  handleCountryChange = async(country) =>{
    const fetchedData = await fetchData(country);
    const previousFetchedData = await fetchPreviousDayData(country);
    //fetch data
    //set state
    previousFetchedData.prevConfirmed = fetchedData.confirmed.value - previousFetchedData.prevConfirmed;
    previousFetchedData.prevDeaths = fetchedData.deaths.value - previousFetchedData.prevDeaths;
    previousFetchedData.prevRecovered = fetchedData.recovered.value - previousFetchedData.prevRecovered;

    this.setState({data: fetchedData,  previousData: previousFetchedData, country: country});
  }

  render(){
    const {data, previousData, country} = this.state;
    console.log(previousData)
    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="COVID-19" />
        <Cards data={data} previousData={previousData} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country}/>
      </div>
    );
  }
}

export default App;

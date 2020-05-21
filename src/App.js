import React from 'react';

import { OptionButtons, Ranking, Cards, Chart, CountryPicker, Footer } from './components'
import styles from './App.module.css'
import { fetchData, fetchPreviousDayData } from './api';

import coronaImage from './images/image.png';

class App extends React.Component {

  state = {
    data: {},
    previousData: {},
    country: '',
    showCharts: true,
    showRanking: false
  }

  async componentDidMount() {
    const fetchedData = await fetchData();
    const previousFetchedData = await fetchPreviousDayData();

    if (previousFetchedData != null && previousFetchedData !== undefined && fetchedData != null && fetchedData !== undefined) {
      previousFetchedData.prevConfirmed = fetchedData.confirmed.value - previousFetchedData.prevConfirmed;
      previousFetchedData.prevDeaths = fetchedData.deaths.value - previousFetchedData.prevDeaths;
      previousFetchedData.prevRecovered = fetchedData.recovered.value - previousFetchedData.prevRecovered;

      fetchedData.percentageRecovered = ((100 * fetchedData.recovered.value) / fetchedData.confirmed.value).toFixed(2);
      fetchedData.percentageDeaths = ((100 * fetchedData.deaths.value) / fetchedData.confirmed.value).toFixed(2);

      this.setState({ data: fetchedData, previousData: previousFetchedData });
    }
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    const previousFetchedData = await fetchPreviousDayData(country);
    if (previousFetchedData != null && previousFetchedData !== undefined && fetchedData != null && fetchedData !== undefined) {
      previousFetchedData.prevConfirmed = fetchedData.confirmed.value - previousFetchedData.prevConfirmed;
      previousFetchedData.prevDeaths = fetchedData.deaths.value - previousFetchedData.prevDeaths;
      previousFetchedData.prevRecovered = fetchedData.recovered.value - previousFetchedData.prevRecovered;

      fetchedData.percentageRecovered = ((100 * fetchedData.recovered.value) / fetchedData.confirmed.value).toFixed(2);
      fetchedData.percentageDeaths = ((100 * fetchedData.deaths.value) / fetchedData.confirmed.value).toFixed(2);

      this.setState({ data: fetchedData, previousData: previousFetchedData, country: country });
    }
  }

  hideShowComponents = (data) => {
    this.setState({showCharts : !this.state.showCharts});
    this.setState({showRanking : !this.state.showRanking});
    
  }

  render() {
    const { data, previousData, country, showCharts, showRanking } = this.state;
    return (
      <div>
        <div>
        <div className={styles.container}>
          <img className={styles.image} src={coronaImage} alt="COVID-19" />
          <OptionButtons buttonOption={this.hideShowComponents} />
          </div>
          {
            showCharts ? (
              <div className={styles.container}>
                <Cards data={data} previousData={previousData} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country} />
              </div>
            ) : null
          }
          {
            showRanking ? (
              <div className={styles.container}>
                <Ranking />
              </div>
            ) : null
          }
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;

import axios from 'axios'
const dayjs = require("dayjs");

const url = 'https://covid19.mathdro.id/api'

export const fetchData = async(country) => {
    let changeableUrl = url;

    if(country){
        changeableUrl = `${url}/countries/${country}`
    }
    try{
        const {data : {confirmed, recovered, deaths, lastUpdate}}  = await axios.get(changeableUrl);
        
        return {confirmed, recovered, deaths, lastUpdate};

    } catch(error){
        console.log(error);
    }
}

export const fetchDailyData = async() => {
    try{
        const {data} = await axios.get(`${url}/daily`);
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }))
        return modifiedData;
    } catch(error){
        console.log(error);
    }
}

export const fetchPreviousDayData = async(country) => {
    try{
        const date = dayjs(
            new Date().toLocaleString("en-US", {
              timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            })
          ).subtract(1, 'day').format("MM-DD-YYYY"); // display
        
        const {data} = await axios.get(`${url}/daily/${date}`);
        let json = {prevConfirmed: 0, prevDeaths: 0, prevRecovered: 0};
        if(country){
            for(let i = 0; i < data.length; i++){
                if(data[i].countryRegion == country){
                    console.log('works')
                json.prevConfirmed += parseInt(data[i].confirmed);
                json.prevDeaths += parseInt(data[i].deaths);
                json.prevRecovered += parseInt(data[i].recovered);
                }
            }
        } else{
            for(let i = 0; i < data.length; i++){
                json.prevConfirmed += parseInt(data[i].confirmed);
                json.prevDeaths += parseInt(data[i].deaths);
                json.prevRecovered += parseInt(data[i].recovered);
            }
        }
        return json;
    } catch(error){ 
        console.log(error);
    }
}

export const fetchCountries = async () => {
    try{
        const {data: {countries}} = await axios.get(`${url}/countries`);

        return countries.map((country) => country.name);
    } catch(error){
        console.log(error);
    }
}
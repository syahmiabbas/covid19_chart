import React, {useState, useEffect} from 'react';
import {NativeSelect, FormControl, Typography } from '@material-ui/core';

import styles from './CountryPicker.module.css';

import { fetchCountries } from '../../api';


const CountryPicker = ({handleCountryChange}) => {
    const [fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries());
        }
        fetchAPI();
    }, [setFetchedCountries]) //Set an array here to reload the state when the setFetchedCountries array changed

    return (
      
        <FormControl className={styles.formControl}>
            <Typography variant="h5">
                Filter By Countries
            </Typography>
            <br />
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;
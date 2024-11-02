import React from 'react';
import { Link } from 'react-router-dom';
import './CountryCard.css';

const CountryCard = ({ country, viewMode }) => (
  <Link to={`/country/${country.name.common}`} className={`country-card ${viewMode}`}>
    <img src={country.flags.svg} alt={`Flag of ${country.name.common}`}  />
    <h3>{country.name.common}</h3>
    <p>Capital: {country.capital ? country.capital[0] : 'N/A'}</p>
    <p>Region: {country.region}</p>
  </Link>
);

export default CountryCard;
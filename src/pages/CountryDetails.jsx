import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCountryDetails } from '../redux/countrySlice';
import Spiner from '../components/Spiner';
import './CountryDetails.css';

const CountryDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { country, loading } = useSelector((state) => state.country);

  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    dispatch(fetchCountryDetails(name));
  }, [dispatch, name]);

  useEffect(() => {
    let timer;
    if (!loading && country) {
      // Set a delay before showing the country details
      timer = setTimeout(() => {
        setShowContent(true);
      }, 2000); // 2-second delay
    }

    return () => clearTimeout(timer);
  }, [loading, country]);

  return (
    <div className="page-container"> 
      {loading || !showContent ? (
        <Spiner />
      ) : (
        <div className="country-details">
          <h2>{country.name.common}</h2>
          <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} />
          <p><strong>Capital:</strong> {country.capital[0]}</p>
          <p><strong>Population:</strong> {country.population}</p>
          <p><strong>Region:</strong> {country.region}</p>
          <p><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</p>
          <button onClick={() => navigate(-1)}>Back</button>
        </div>
      )}
    </div>
  );
};

export default CountryDetails;


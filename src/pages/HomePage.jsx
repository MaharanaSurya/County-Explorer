import React, { useEffect, useState,} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountries } from '../redux/countrySlice';
import CountryCard from '../components/CountryCard';
import Spiner from '../components/Spiner';
import './HomePage.css';


const HomePage = () => {
  const dispatch = useDispatch();
  const { countries, loading } = useSelector((state) => state.country);

  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('All');

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = region === 'All' || country.region === region;
    return matchesSearch && matchesRegion;
  });

  return (
    
    <div className="home-page">
      <h1>Country Explorer</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={region} onChange={handleRegionChange} className="region-select">
          <option value="All">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
        <button className='on_mobile' onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
          Toggle {viewMode === 'grid' ? 'List' : 'Grid'} View
        </button>
      </div>
      {loading ? (
        <Spiner/>
      ) : (
        <div className={`countries-container ${viewMode}`}>
          {filteredCountries.map((country) => (
            <CountryCard key={country.cca3} country={country} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
   
  );
};

export default HomePage;

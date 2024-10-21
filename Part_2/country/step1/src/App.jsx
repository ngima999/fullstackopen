import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    // Fetch country data when component mounts
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  return (
    <div>
      <div>
        find countries <input value={search} onChange={handleSearchChange} />
      </div>
      <CountriesDisplay countries={filteredCountries} />
    </div>
  );
};

const CountriesDisplay = ({ countries }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length > 1) {
    return (
      <ul>
        {countries.map(country => (
          <li key={country.cca3}>{country.name.common}</li>
        ))}
      </ul>
    );
  }

  if (countries.length === 1) {
    return <CountryDetail country={countries[0]} />;
  }

  return <p>No matches</p>;
};

const CountryDetail = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`flag of ${country.name.common}`} width="100" />
    </div>
  );
};

export default App;

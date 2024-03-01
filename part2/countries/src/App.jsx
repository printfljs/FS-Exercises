import { useState, useEffect } from 'react';
import country from './services/country';

function App() {
  const [searchName, setSearchName] = useState('');
  const [countries, setCountries] = useState([]);
  const [displayContent, setDisplayContent] = useState(null);

  useEffect(() => {
    country.getList()
      .then(response => {
        setCountries(response);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (searchName === '') {
      setDisplayContent(null);
      return;
    }

    const countriesToShow = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchName.toLowerCase())
    );

    if (countriesToShow.length > 10) {
      setDisplayContent(<div>Too many matches, specify another filter</div>);
    } else if (countriesToShow.length > 1) {
      setDisplayContent(
        <div>
          {countriesToShow.map(country => (
            <div key={country.cca2}>
              <span>{country.name.common}</span>&nbsp;
              <button onClick={() => showCountryDetail(country)}>show</button>
            </div>
          ))}
        </div>
      );
    } else {
      displayDetail(countriesToShow[0].name.common)
    }
  }, [searchName, countries]);

  const displayDetail = countryName => {
    country.getDetail(countryName)
      .then(response => {
        setDisplayContent(
          <div>
            <h1>{response.name.common}</h1>
            <p>capital {response.capital[0]}</p>
            <p>area {response.area}</p>
            <h2>languages</h2>
            <ul>
              {Object.values(response.languages).map((language, i) => (
                <li key={i}>{language}</li>
              ))}
            </ul>
            <img
              src={response.flags.png}
              alt={`flag of ${response.name.common}`}
              width="100"
            />
          </div>
        );
      })
      .catch(error => {
        console.log(error);
        setDisplayContent(<div>Error fetching country details</div>);
      });
  }

  const showCountryDetail = countryName => {
    displayDetail(countryName.name.common)
  }

  const handleNameChange = e => {
    setSearchName(e.target.value);
  };

  return (
    <>
      <div>find countries <input onChange={handleNameChange} value={searchName} /></div>
      {displayContent}
    </>
  );
}

export default App;

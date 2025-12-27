import { useState } from "react";
import CountryInfo from "./CountryInfo";
import { useEffect } from "react";

const Content = ({ countries, searchKey }) => {
  if (!searchKey) return null;

  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const filteredList = countries.filter((item) => {
      return item.name.common.toLowerCase().includes(searchKey.toLowerCase());
    });
    setFilteredCountries(filteredList);
  }, [countries, searchKey]);

  const showCountryInfo = (country) => {
    setFilteredCountries([country]);
  };

  if (filteredCountries.length > 10)
    return <p>Too many matches, specify another filter</p>;

  if (filteredCountries.length === 0) return <p>Nothing found!</p>;

  if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    return (
      <>
        <div>
          {filteredCountries.map((country) => (
            <div key={country.cca2}>
              <span>{country.name.common}</span>{" "}
              <button
                onClick={() => {
                  showCountryInfo(country);
                }}
              >
                show
              </button>
            </div>
          ))}
        </div>
      </>
    );
  }

  return <CountryInfo country={filteredCountries[0]}></CountryInfo>;
};

export default Content;

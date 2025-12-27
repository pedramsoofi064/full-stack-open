import Weather from "./Weather";

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>
        {country.name.common}
      </h1>
      <p><b>official:</b> {country.name.official}</p>
      <p><b>capital:</b> {country.capital[0]}</p>
      <p><b>area:</b> {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
      <div>
        <img alt="" src={country.flags.png} />
      </div>
      <Weather city={country.capital[0]} />
    </div>
  );
};

export default CountryInfo;

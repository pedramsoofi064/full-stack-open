import { useState, useEffect } from "react";
import TextField from "./components/TextField";
import Content from "./components/Content";

import countryServices from "./services/country";

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countryServices.getAll().then((response) => {
      console.log(response);
      setCountries(response.data);
    });
  }, []);

  const [searchKey , setSearchKey] = useState("")

  return (
    <>
      <TextField
        title="find countries"
        value={searchKey}
        setFieldValue={setSearchKey}
      ></TextField>
      <Content countries={countries} searchKey={searchKey}></Content>
    </>
  );
}

export default App;

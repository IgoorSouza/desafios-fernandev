import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon").then((res) => {
      const sortedArray = [...res.data.results];
      sortedArray.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      const promisesArray = sortedArray.map((item) => {
        return axios.get(item.url);
      });

      Promise.all(promisesArray).then((values) => setList(values));
    });
  }, []);

  return (
    <div className="container">
      {list.map((item) => (
        <div key={item.data.name}>{<Pokemon details={item.data} />}</div>
      ))}
    </div>
  );
}

function Pokemon({ details }) {
  return (
    <>
      <img src={details.sprites.front_default} alt={details.name} />
      <span>
        <strong>{details.name}</strong> - EXP {details.base_experience}
      </span>
    </>
  );
}

export default App;

Pokemon.propTypes = {
  details: PropTypes.object,
};

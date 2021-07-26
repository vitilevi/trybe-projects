import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanetApi from '../service/requestApi';
import PlanetsContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [arrayOfPlanets, setArrayOfPlanets] = useState([]);

  useEffect(() => {
    const requestApi = async () => {
      const planets = await fetchPlanetApi();
      planets.forEach((planet) => delete planet.residents);
      setArrayOfPlanets(planets);
    };
    requestApi();
  }, []);

  return (
    <PlanetsContext.Provider value={ { planets: arrayOfPlanets } }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = ({
  children: PropTypes.element.isRequired,
});

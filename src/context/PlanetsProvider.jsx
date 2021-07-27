import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanetApi from '../service/requestApi';
import PlanetsContext from './PlanetsContext';

export default function PlanetsProvider({ children }) {
  const [arrayOfPlanets, setArrayOfPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [order, setOrder] = useState({
    column: 'name',
    sort: 'ASC',
  });

  useEffect(() => {
    // Faz a requisição a API e salva o resultado no estado
    const requestApi = async () => {
      const planets = await fetchPlanetApi();
      planets.forEach((planet) => delete planet.residents);
      setArrayOfPlanets(planets);
    };
    requestApi();
  }, []);

  const info = {
    data: arrayOfPlanets,
    filters: {
      filterByName,
      filterByNumericValues,
    },
    order,
    setFilterByName,
    setFilterByNumericValues,
    setOrder,
  };

  return (
    <PlanetsContext.Provider value={ info }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = ({
  children: PropTypes.element.isRequired,
});

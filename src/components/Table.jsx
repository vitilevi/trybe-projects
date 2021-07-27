import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Table() {
  const {
    data,
    filters: {
      filterByName,
      filterByNumericValues,
    },
  } = useContext(PlanetsContext);
  // define um objeto de filtro padrão
  const defaultObj = {
    column: '',
    comparison: '',
    value: 0,
  };
  // define um objeto de filtro padrão caso não exista um
  const selectedFilter = filterByNumericValues.length
    ? filterByNumericValues[filterByNumericValues.length - 1] : defaultObj;

  // seleciona o filtro desejado
  const {
    column,
    comparison,
    value } = selectedFilter;

  // filtra o array original por nome
  const filteredByName = data.filter(({ name }) => name.includes(filterByName));

  // filtra o array de nome por filtros escolhidos
  const filteredByColumn = filteredByName.filter((planet) => {
    const selectedColumn = planet[column];

    switch (comparison) {
    case 'maior que':
      return Number(selectedColumn) > Number(value);
    case 'igual a':
      return Number(selectedColumn) === Number(value);
    case 'menor que':
      return Number(selectedColumn) < Number(value);
    default:
      return true;
    }
  });

  if (!data.length) return <h1>Loading...</h1>;
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation_period</th>
          <th>Orbital_period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {
          filteredByColumn
            .map(({
              name,
              rotation_period: rotationPeriod,
              orbital_period: orbitalPeriod,
              diameter,
              climate,
              gravity,
              terrain,
              surface_water: surfaceWater,
              population,
              films,
              created,
              edited,
              url,
            }) => (
              <tr key={ name }>
                <td>{name}</td>
                <td>{rotationPeriod}</td>
                <td>{orbitalPeriod}</td>
                <td>{diameter}</td>
                <td>{climate}</td>
                <td>{gravity}</td>
                <td>{terrain}</td>
                <td>{surfaceWater}</td>
                <td>{population}</td>
                <td>{films}</td>
                <td>{created}</td>
                <td>{edited}</td>
                <td>{url}</td>
              </tr>
            ))
        }
      </tbody>
    </table>
  );
}

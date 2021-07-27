import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Table() {
  const {
    data,
    filters: {
      filterByName,
      filterByNumericValues,
    },
    order,
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

  // Faz o sort inicial por nome
  const sortByName = filteredByColumn.sort((a, b) => {
    const NEGATIVE = -1;
    const POSITIVE = 1;
    return a.name > b.name ? NEGATIVE : POSITIVE;
  });

  // Faz o sort conforme coluna selecionada
  const sortedList = sortByName.sort((a, b) => {
    const { column: sortColumn, sort } = order;
    const NEGATIVE = -1;
    const POSITIVE = 1;
    if (sort === 'ASC') {
      // Checa se o valor é um numero e define o retorno para string e number
      if (Number(filteredByColumn[0][sortColumn])) {
        return Number(a[sortColumn]) - Number(b[sortColumn]);
      } return NEGATIVE;
    }
    if (sort === 'DESC') {
      // Checa se o valor é um numero e define o retorno para string e number
      if (Number(filteredByColumn[0][sortColumn])) {
        return Number(b[sortColumn]) - Number(a[sortColumn]);
      } return POSITIVE;
    } return NEGATIVE;
  });

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
          sortedList
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
                <td data-testid="planet-name">{name}</td>
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

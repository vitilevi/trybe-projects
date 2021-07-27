import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function NumericalFilters() {
  const {
    filters: { filterByNumericValues },
    setFilterByNumericValues,
  } = useContext(PlanetsContext);

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior_que');
  const [value, setValue] = useState(0);

  const handleFilterButton = () => {
    const obj = {
      column,
      comparison,
      value,
    };
    setFilterByNumericValues([...filterByNumericValues, obj]);
  };

  return (
    <div>
      <select
        data-testid="column-filter"
        name="column-filter"
        value={ column }
        onChange={ (e) => setColumn(e.target.value) }
        id="column-filter"
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison-filter"
        value={ comparison }
        onChange={ (e) => setComparison(e.target.value) }
        id="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        name="value-filter"
        value={ value }
        onChange={ (e) => setValue(e.target.value) }
        min="0"
        id="value-filter"
        placeholder="Insira um valor"
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleFilterButton }
      >
        Filtrar
      </button>
    </div>
  );
}

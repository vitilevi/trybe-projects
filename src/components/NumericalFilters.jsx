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
  const [filters, setFilters] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const handleFilterButton = () => {
    const obj = {
      column,
      comparison,
      value,
    };
    const filteredSelect = filters.filter((item) => item !== column);
    setFilters([...filteredSelect]);
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
        {filters.map((item, index) => (
          <option key={ index } value={ item }>{item}</option>
        ))}
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

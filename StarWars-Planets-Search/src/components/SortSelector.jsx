import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function SortSelector() {
  const { setOrder } = useContext(PlanetsContext);

  const [sortColumn, setsortColumn] = useState('population');
  const [sort, setSort] = useState('ASC');

  const columns = [
    'name',
    'population',
    'climate',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const handleSortButton = () => {
    const obj = {
      column: sortColumn.toLowerCase(),
      sort,
    };
    setOrder(obj);
  };

  return (
    <div>
      <select
        name="sort-column"
        data-testid="column-sort"
        id="sort-column"
        value={ sortColumn }
        onChange={ (e) => setsortColumn(e.target.value) }
      >
        {columns.map((item, index) => (
          <option key={ index } value={ item }>{item}</option>
        ))}
      </select>
      <label htmlFor="sort-asc">
        <input
          type="radio"
          value="ASC"
          name="sort"
          onChange={ (e) => setSort(e.target.value) }
          id="sort-asc"
          data-testid="column-sort-input-asc"
        />
        ASC
      </label>
      <label htmlFor="sort-desc">
        <input
          type="radio"
          value="DESC"
          name="sort"
          onChange={ (e) => setSort(e.target.value) }
          id="sort-desc"
          data-testid="column-sort-input-desc"
        />
        DESC
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleSortButton }
      >
        Sort
      </button>
    </div>
  );
}

import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function SelectedFilters() {
  const {
    filters: { filterByNumericValues },
    setFilterByNumericValues,
  } = useContext(PlanetsContext);

  const handleFilterDelete = (item) => {
    const filtered = filterByNumericValues.filter((el) => el !== item);
    setFilterByNumericValues(filtered);
  };

  return (
    <div>
      {filterByNumericValues && filterByNumericValues.map((item, index) => (
        <div key={ index } data-testid="filter">
          {item.column}
          <button type="button" onClick={ () => handleFilterDelete(item) }>X</button>
        </div>
      ))}
    </div>
  );
}

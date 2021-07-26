import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function FilterByName() {
  const { setFilterByName } = useContext(PlanetsContext);

  const handleInputChange = ({ target: { value } }) => {
    setFilterByName(value);
  };

  return (
    <form>
      <input
        data-testid="name-filter"
        placeholder="Insert name"
        type="text"
        onChange={ handleInputChange }
      />
    </form>
  );
}

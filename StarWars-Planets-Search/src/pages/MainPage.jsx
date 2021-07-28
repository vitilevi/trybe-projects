import React from 'react';
import FilterByName from '../components/FilterByName';
import NumericalFilters from '../components/NumericalFilters';
import SelectedFilters from '../components/SelectedFilters';
import SortSelector from '../components/SortSelector';
import Table from '../components/Table';
import PlanetsProvider from '../context/PlanetsProvider';

export default function MainPage() {
  return (
    <PlanetsProvider>
      <FilterByName />
      <NumericalFilters />
      <SortSelector />
      <SelectedFilters />
      <Table />
    </PlanetsProvider>
  );
}

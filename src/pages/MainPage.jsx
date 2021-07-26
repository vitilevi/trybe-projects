import React from 'react';
import FilterByName from '../components/FilterByName';
import Table from '../components/Table';
import PlanetsProvider from '../context/PlanetsProvider';

export default function MainPage() {
  return (
    <PlanetsProvider>
      <FilterByName />
      <Table />
    </PlanetsProvider>
  );
}
